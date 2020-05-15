//  questo file fa partire il server di backend 
// lo utilizzeremo per prendere dati con le api
// notare che abbiamo usato express
const express = require('express');
const server = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'vscommerce',
    multipleStatements: true,
    timezone: '+2:00',
});
Connection.connect(function (err) {
    if (err) throw err;
});

//serve per le post
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get('/api/products', (req, res) => {
    Connection.query('SELECT * FROM `prodotti` ORDER BY pr_pk_id DESC', (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
    })
})

server.get('/api/brand-categories', (req, res) => {
    let query = `SELECT * FROM marche;
    SELECT * FROM categorie;`
    Connection.query(query, [1, 2], (err, results) => {
        if (!err) {
            res.send({ marche: results[0], categorie: results[1] })
        } else {
            console.log(err);
        }
    })
})


//dettagli prodotto
server.get('/api/product/details/:id', (req, res) => {
    let query = `SELECT pr_pk_id, pr_nome, pr_descrizione,pr_quantita,pr_barcode, pr_prezzo,pr_iva, pr_copertina, pr_fk_marca, pr_fk_categoria, ma_nome, ca_nome 
    FROM prodotti, categorie, marche 
    WHERE pr_fk_categoria = ca_pk_id AND pr_fk_marca = ma_pk_id AND pr_pk_id = ${req.params.id}`;
    Connection.query(query, (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
    })
})

// semplici statistiche sull ecommerce
server.get('/api/admin/statistics', (req, res) => {

    // query multipla per restituire i dati tutti in una volta nella callback
    let query = `SELECT count(*) as orders FROM ordini;
    SELECT SUM(totale) as totale FROM ordini;
    SELECT sum(righe_ordine.quantita) as vendite, righe_ordine.id_prodotto, prodotti.pr_nome from righe_ordine inner join prodotti on righe_ordine.id_prodotto = prodotti.pr_pk_id group by righe_ordine.id_prodotto;`;
    let ordini = 0;
    Connection.query(query, [1, 3], (err, results) => {
        if (!err) {
            const ordini = results[0][0].orders
            const totale = results[1][0].totale
            let prodotti = results[2]
            let vendite = 0;
            let bestSeller = 'nessuno';
            for (let i = 0; i < prodotti.length; i++) {
                if (prodotti[i].vendite > vendite) {
                    bestSeller = prodotti[i].pr_nome + '[' + prodotti[i].id_prodotto + ']'
                    vendite = prodotti[i].vendite
                }
            }
            res.send({ ordini: ordini, totale: totale, bestSeller: bestSeller })
        }
        else {
            console.log(err);
        }
    })
})

//ottieni categorie
server.get('/api/categories', (req, res) => {
    Connection.query('SELECT * FROM `categorie` ORDER BY ca_nome ASC', (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
    })
})

server.get('/api/brands', (req, res) => {
    Connection.query('SELECT * FROM `marche` ORDER BY ma_nome ASC', (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
    })
})


// facciamo partire il server in ascolto sulla porta 5000
server.listen('5000', () => {
    console.log('Running on port 5000');
});


// controllo del token jwt per vedere se è ancora valido o è scaduto
server.post('/api/auth', (req, res) => {

    jwt.verify(req.body.token, 'vscommerce', function (err, decoded) {
        if (err) {
            return res.status(403).send({
                success: false,
                message: 'Failed to authenticate token.'
            });
        } else {
            // if everything is good, save to request for use in other routes
            return res.status(200).json(decoded);
        }
    });

});


//elimina prodotto
server.post('/api/delete/product', (req, res) => {

    let query = `DELETE FROM prodotti WHERE pr_pk_id = ${req.body.id}`;
    console.log(query);
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            Connection.query('SELECT * FROM `prodotti` ORDER BY pr_pk_id DESC', (err2, rows2, field2) => {
                if (!err) res.send(rows2);
                else console.log(err);
            })
        } else {
            console.log(err)
        }
    })

})

//prodotti filtrati
server.post('/api/product', (req, res) => {
    let filters = req.body.filters;
    let price_filter = '';
    console.log(filters)
    if (filters.prezzoDa > 0 && filters.prezzoA > 0) {
        price_filter = `(pr_prezzo BETWEEN ${filters.prezzoDa} AND ${filters.prezzoA}) AND`
    } else if (filters.prezzoDa > 0 && filters.prezzoA === 0) {
        price_filter = `pr_prezzo >= ${filters.prezzoDa} AND`
    } else if (filters.prezzoDa === 0 && filters.prezzoA > 0) {
        price_filter = `pr_prezzo <= ${filters.prezzoA} AND`
    }

    let query = `select * FROM prodotti WHERE ${price_filter}
		(${filters.categoria} = 0 OR pr_fk_categoria = ${filters.categoria}) AND
        ( ${filters.marca} = 0 OR pr_fk_marca = ${filters.marca}) ORDER BY pr_pk_id DESC;`;
    console.log(query)
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err)
        }
    })

})

//insert category
server.post('/api/add/category', (req, res) => {

    let query = `INSERT INTO categorie (ca_nome) VALUES ('${req.body.nome}')`;
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send('Successo');
            ;
        } else {
            console.log('Errore')
        }
    })

})

// update category
server.post('/api/update/category', (req, res) => {

    let query = `UPDATE categorie SET ca_nome = '${req.body.nome}' WHERE ca_pk_id = ${req.body.id}`;
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send('Successo');
        } else {
            console.log('Errore')
        }
    })

})

// delete category
server.post('/api/delete/category', (req, res) => {

    let query = `DELETE FROM categorie WHERE ca_pk_id = ${req.body.id}`;
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send('Successo');

        } else {
            console.log('Errore')
        }
    })

})

//insert brand
server.post('/api/add/brand', (req, res) => {

    let query = `INSERT INTO marche (ma_nome) VALUES ('${req.body.nome}')`;
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send('Successo');
            ;
        } else {
            console.log('Errore')
        }
    })

})

// update brand
server.post('/api/update/brand', (req, res) => {

    let query = `UPDATE marche SET ma_nome = '${req.body.nome}' WHERE ma_pk_id = ${req.body.id}`;
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send('Successo');
        } else {
            console.log('Errore')
        }
    })

})

// delete brand
server.post('/api/delete/brand', (req, res) => {

    let query = `DELETE FROM marche WHERE ma_pk_id = ${req.body.id}`;
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send('Successo');

        } else {
            console.log('Errore')
        }
    })

})

// update or insert product
server.post('/api/post/product', (req, res) => {
    const product = req.body.product;
    let query;
    if ('pr_pk_id' in product) {
        //update
        query = `UPDATE prodotti SET pr_nome = '${product.pr_nome}', pr_descrizione = '${product.pr_descrizione}', pr_iva = ${('pr_iva' in product) ? product.pr_iva : null},
        pr_prezzo = ${('pr_prezzo' in product) ? product.pr_prezzo : null}, pr_quantita = ${('pr_quantita' in product) ? product.pr_quantita : null}, pr_copertina = '${product.pr_copertina}',
        pr_barcode = '${product.pr_barcode}', pr_fk_marca = ${('pr_fk_marca' in product) ? product.pr_fk_marca : null},pr_fk_categoria = ${('pr_prezzo' in product) ? product.pr_fk_categoria : null} 
        WHERE pr_pk_id = ${product.pr_pk_id}`
    }
    else {
        //insert
        query = `INSERT INTO prodotti (pr_nome, pr_descrizione, pr_iva, pr_prezzo, pr_quantita, pr_copertina, pr_barcode, pr_fk_marca, pr_fk_categoria)
        VALUES ('${product.pr_nome}','${product.pr_descrizione}',${('pr_iva' in product) ? product.pr_iva : null},
        ${('pr_prezzo' in product) ? product.pr_prezzo : null},${('pr_quantita' in product) ? product.pr_quantita : null},'${product.pr_copertina}',
        '${product.pr_barcode}',${('pr_fk_marca' in product) ? product.pr_fk_marca : null},${('pr_fk_categoria' in product) ? product.pr_fk_categoria : null})`
    }
    Connection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send({ message: 'Eseguito con successo' });
        } else {
            console.log(err)
            res.send({ message: 'errore' })
        }


    })


})

// login
server.post('/api/login', (req, res) => {
    Connection.query(`SELECT * FROM clienti WHERE cl_email = '${req.body.email}' AND cl_password = '${req.body.password}'`, (err, rows, fields) => {
        if (!err) {
            if (rows.length) {
                let token_payload = {
                    email: rows[0].cl_email,
                    password: rows[0].cl_password,
                    isAdmin: rows[0].cl_admin,
                };
                // creo un token con email e password che dura un tot
                let token = jwt.sign(token_payload, "vscommerce", { expiresIn: '1h' });
                let response = {
                    message: 'login eseguito',
                    token: token,
                    isAdmin: rows[0].cl_admin,
                };

                // 200 tutto ok e passo response al component
                return res.status(200).json(response);

            } else {
                return res.status("409").json("Password o email sbagliata");
            }
        }

    })
});

//conferma ordine e crea righe d'ordine
server.post('/api/confirm/order', (req, res) => {
    const cart = req.body.cart;
    Connection.query(`SELECT * FROM clienti WHERE cl_email = '${req.body.customer}'`, (err, rows, fields) => {
        if (!err) {
            if (rows.length) {
                const id_cliente = rows[0].cl_pk_id
                let query = `INSERT INTO ordini (id_cliente, totale) values (${id_cliente}, ${req.body.total})`;
                Connection.query(query, (err2, result) => {
                    if (!err2) {
                        let orderLineQueries = ``;
                        for (let i = 0; i < cart.length; i++) {
                            orderLineQueries += `INSERT INTO righe_ordine (id_ordine, id_prodotto, quantita, prezzo) values (${result.insertId}, 
                                ${cart[i].product.pr_pk_id}, ${cart[i].qty}, ${cart[i].product.pr_prezzo});
                                UPDATE prodotti SET pr_quantita = ${cart[i].product.pr_quantita-cart[i].qty} WHERE pr_pk_id = ${cart[i].product.pr_pk_id};`
                        }
                        Connection.query(orderLineQueries, [1, cart.length], (err3, results) => {
                            if (!err3) {
                                return res.status("200").json("success");
                            }
                            else {
                                console.log(err3);
                                return res.status("400").json("errore");
                            }
                        })
                    } else {
                        console.log(err2)
                        return res.status("400").json("errore");
                    }


                })
            } else {
                console.log(err)
                return res.status("400").json("errore");
            }
        }

    })
});


//tutti gli ordini di un cliente
server.post('/api/orders', (req, res) => {
    const cart = req.body.cart;
    Connection.query(`SELECT * FROM clienti WHERE cl_email = '${req.body.customer}'`, (err, rows, fields) => {
        if (!err) {
            if (rows.length) {
                const id_cliente = rows[0].cl_pk_id
                let query = `SELECT * FROM ordini WHERE id_cliente = ${id_cliente} ORDER BY data_ordine DESC`;

                Connection.query(query, (err2, orders, fields) => {
                    if (!err2) {
                        let orderLineQueries = ``;
                        for (let i = 0; i < orders.length; i++) {
                            orderLineQueries += `SELECT righe_ordine.id_riga, righe_ordine.prezzo,righe_ordine.quantita,prodotti.pr_nome,prodotti.pr_descrizione,prodotti.pr_pk_id 
                            FROM righe_ordine INNER JOIN prodotti ON righe_ordine.id_prodotto = prodotti.pr_pk_id WHERE righe_ordine.id_ordine = ${orders[i].or_pk_id};`
                        }
                        Connection.query(orderLineQueries, [1, orders.length], (err3, results) => {
                            if (!err3) {
                                if (orders.length > 1) {
                                    for (let i = 0; i < orders.length; i++) {
                                        orders[i].righe_ordine = results[i];
                                    }
                                } else {
                                    orders[0].righe_ordine = results;
                                }


                                res.send(orders)
                            }
                            else {
                                console.log(err3);
                                return res.status("400").json("errore");
                            }
                        })

                    } else {
                        console.log(err2)
                        return res.status("400").json("errore");
                    }


                })
            } else {
                console.log(err)
                return res.status("400").json("errore");
            }
        }

    })
});


//controllo se non esiste già un cliente con quella mail e poi registro il nuovo cliente
server.post('/api/signin', (req, res) => {
    const customer = req.body.customer;
    Connection.query(`SELECT * FROM clienti WHERE cl_email = '${customer.cl_email}'`, (err, rows, fields) => {
        if (rows.length === 0) {
            let query = `INSERT INTO clienti (cl_nome, cl_cognome, cl_data_nascita, cl_email, cl_password, cl_admin, cl_codice_fiscale)
                VALUES ('${customer.cl_nome}', '${customer.cl_cognome}', '${customer.cl_data_nascita}', '${customer.cl_email}', '${customer.cl_password}', 0, '${customer.cl_codice_fiscale}')`
            Connection.query(query, (err2, rows2, fields2) => {
                if (!err2) {
                    return res.status("200").json("success");
                } else {
                    return res.status("400").json("errore");
                }

            })
        } else {
            return res.status("400").json("mail");
        }
    })
});



server.post('/api/customer', (req, res) => {

    Connection.query(`SELECT cl_pk_id, cl_nome, cl_cognome, cl_data_nascita, cl_email, cl_admin, cl_codice_fiscale  FROM clienti WHERE cl_email = '${req.body.email}'`, (err, rows, fields) => {

        if (!err) {
            res.send(rows[0])
        } else {
            return res.status("400").json("errore");
        }
    })
});

//controllo se nelle modifiche c'è anche la modifica della password.
//se c'è vado a vedere se la vecchia password che ha inserito è corretta e poi la aggiorno con quella nuova
server.post('/api/edit/customer', (req, res) => {
    const customer = req.body.customer;
    let query = ``;
    if (customer.cl_password_old) {
        Connection.query(`SELECT * FROM clienti WHERE cl_pk_id = '${customer.cl_pk_id}' AND cl_password = '${customer.cl_password_old}'`, (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    query = `UPDATE clienti SET cl_nome = '${customer.cl_nome}', cl_cognome = '${customer.cl_cognome}', cl_data_nascita = '${customer.cl_data_nascita}',
                        cl_codice_fiscale = '${customer.cl_codice_fiscale}', cl_password = '${customer.cl_password_new}' WHERE cl_pk_id = ${customer.cl_pk_id}`
                    Connection.query(query, (err, rows, fields) => {

                        if (!err) {
                            return res.status("200").json("success");
                        } else {
                            return res.status("400").json("errore");
                        }
                    })
                } else {
                    return res.status("403").json("password")
                }
            } else {
                return res.status("400").json("errore");
            }
        })
    } else {
        query = `UPDATE clienti SET cl_nome = '${customer.cl_nome}', cl_cognome = '${customer.cl_cognome}', cl_data_nascita = '${customer.cl_data_nascita}',
            cl_codice_fiscale = '${customer.cl_codice_fiscale}' WHERE cl_pk_id = ${customer.cl_pk_id}`
        Connection.query(query, (err, rows, fields) => {

            if (!err) {
                return res.status("200").json("success");
            } else {
                return res.status("400").json("errore");
            }


        })
    }

});
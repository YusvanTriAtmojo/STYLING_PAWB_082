const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getPokemon(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pokemons;', function (error, results) {
                if (error) throw error;
                
               
                if (results.length > 0) {
                    res.render('pokemon', {
                        url: 'http://localhost:5050/',
                        pokemons: results 
                    });
                } else {
                    res.render('pokemon', {
                        url: 'http://localhost:5050/',
                        pokemons: [] 
                    });
                }
            });
            connection.release();
        });
    },
    savePokemon(req, res) {
        let { name, type, abilitie, attack} = req.body;
        console.log(name, type, abilitie, attack); 
        if (name && type && abilitie && attack) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO pokemons (name, type, abilitie, attack) VALUES (?, ?, ?, ?);`,
                    [name, type, abilitie, attack], 
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/pokemon');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },    
    updatePokemon(req, res) {
        const { id } = req.params;
        const { name, type, abilitie, attack } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE pokemons SET name = ?, type = ?, abilitie = ?, attack = ? WHERE id = ?',
                [name, type, abilitie, attack, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/pokemon');
                }
            );
            connection.release();
        });
    },
    deletePokemon(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM pokemons WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/pokemon');
            });
            connection.release();
        });
    },
};


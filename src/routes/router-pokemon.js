const router = require('express').Router();
const pokemonController = require('../controllers/controller-pokemon');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, pokemonController.getPokemon);
router.post('/save', verifyUser.isLogin, pokemonController.savePokemon);
router.post('/update/:id', verifyUser.isLogin, pokemonController.updatePokemon);
router.get('/delete/:id', verifyUser.isLogin, pokemonController.deletePokemon);

module.exports = router;
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();



router.get('/fred', function(req, res) {
    res.render('fred', { title: 'Hello, Worlds!' });
});

/* accueil */
router.get('/accueil', function(req, res) {
    res.render('accueil', { title: 'Accueil' });
});

/* nav */
router.get('/nav', function(req, res) {
    res.render('nav', { title: 'navigation' });
});

/* Liste tache */
router.get('/liste_tache', function(req, res) {
    res.render('liste_tache', { title: 'Liste' });
});

/* plannification  tache */
router.get('/visual_plannif', function(req, res) {
    res.render('visual_plannif', { title: 'Liste' });
});

/* liste utilisateurs */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/*Supprimer utilisateur*/
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


/*Ajout utilisateur*/

router.get('/ajoutUtilisateur', function(req, res) {
    res.render('ajoutUtilisateur', { title: 'ajout' });
});

router.get('/modifierUtilisateur', function(req, res) {
    res.render('modifierUtilisateur', { title: 'Modifier' });
});



router.get('/voirUtilisateur', function(req, res) {
	var val = req.query.search;
	//console.log('eeeeeeeeeee'+val);
});

router.post('/view',function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
})

router.post('/adduser', function(req, res) {
	/*variable local*/
	var db = req.db;
	var nom			= req.body.nom;
	var prenom 		= req.body.prenom;
	var telephone 	= req.body.telephone;
	var adresse 	= req.body.adresse;
	var username 	= req.body.username;
	var email 	    = req.body.email;
	
	//collection
	var collection = db.get('usercollection');
	collection.insert({
		"name" : nom,
		"lastname" : prenom,
		"phone_number" : telephone,
		"adresse" : adresse,
		"phone_number" : telephone,
		"username" : username,
		"email" : email
	},function(err,doc){
		if(err){
			res.send("Erreur dans l'ajout");
		}else{
			res.redirect("userlist");
		}
	});
});

module.exports = router;

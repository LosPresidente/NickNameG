var axios = require('axios');

const getsyn = (words) => {
    return words[Math.floor(Math.random() * words.length)]
}

/* GET homepage */
const index = (req, res) => {
    res.render('index', { title: "Nickname Generator"});
};

const BHL_KEY = process.env.BHL_KEY;

const nickname = (req, res) => {
    // console.log(req.body);
    // console.log(req.body.fname);
    // console.log(req.body.lname);
    // console.log(req.body.ptraits);
    // console.log(req.body.ntraits);

    let randpsyn = "";
    let randnsyn = "";
    let randcsyn = "";

    // https://words.bighugelabs.com/site/api
    axios.all([
        axios.get("https://words.bighugelabs.com/api/2/" + BHL_KEY + "/" + req.body.ptraits + "/json"),
        axios.get("https://words.bighugelabs.com/api/2/" + BHL_KEY + "/" + req.body.ntraits + "/json"),
        axios.get("https://words.bighugelabs.com/api/2/" + BHL_KEY + "/" + req.body.cities + "/json")
    ]).then((responses) => {

        //get response text
        // let synonyms = response.data.adjective.syn;
        // randsyn = synonyms[Math.floor(Math.random() * synonyms.length)];
        randpsyn = getsyn(responses[0].data.adjective.sim);
        console.log(req.body.fname + ", the " + randpsyn.toUpperCase());

        randnsyn = getsyn(responses[1].data.adjective.sim);
        console.log(req.body.fname + ", the " + randnsyn.toUpperCase());       
        
        //I run this twice because I want the second result from bigHUGEThesaurus
        randcsyn = getsyn(responses[2].data.noun.syn);
        console.log(req.body.fname + ", the " + randnsyn.toUpperCase());   

        randcsyn = getsyn(responses[2].data.noun.syn);
        console.log(req.body.fname + ", the " + randnsyn.toUpperCase());   

        res.render('results', { title: "Nickname Results", 
                                nickname: req.body.fname + " the " + randpsyn + 
                                          ", " + randnsyn + "  " + req.body.lname + " from " + randcsyn});
    })
    .catch((error) => {
        //handle error
        console.log(error);
    })
}

module.exports = {
    index,
    nickname
}
/* ES6 style */
// export default {
//     index
// }
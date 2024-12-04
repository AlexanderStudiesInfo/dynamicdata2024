//create a variable to store users that sign up 
let eList = require('../data/emails.json')
//to write or create we need node's file system fs
const fs = require('fs')
//create your functions
exports.newsletterSignupnewsletterSignup = (req, res) => {
     res.render('newsletter-signup')
}
exports.newsletterSignupProcess = (req, res) => {
    console.log(req.body)
    //to store the data:
    //first create a new user variable
    var newUser = {
        "firstname": req.body.firstname, 
        "lastname": req.body.lastname,
        "address": req.body.address,
        "city": req.body.city,
        "state": req.body.state,
        "zip": req.body.zip,
        "email": req.body.email
        }
        console.log("Cleaned user")
        console.log(newUser)
        //once we have a clean user, we add it to the eList
        eList.users.push(newUser)
        var json = JSON.stringify(eList)

        fs.writeFileSync('./data/emails.json',json,'utf8',()=>(
            console.log("finished writing file")
        ))
        console.log("current eList")
        console.log(eList)
        // res.render('thankyou')
        res.redirect(303,'/newsletter/thankyou')
}

exports.newsletterSignupList = (req, res)=>{
    console.log(eList)
    res.render('userspace', {"users":eList.users})
}

exports.newsletterUser = (req, res) => {
    var userDetails = eList.users.filter((user)=>{
        return user.email == req.params.email
    })

    res.render('userdetails',{"users":userDetails})
}

exports.newsletterUserDelete = (req, res) => {
    var newUsers = {"users":[]}
    
    newUsers.users = eList.users.filter((user)=>{
        return user.email != req.params.email
    })

    var json = JSON.stringify(newUsers)

    fs.writeFileSync('/data')
    res.send(<a)
}
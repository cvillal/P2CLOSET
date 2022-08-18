# P2CLOSET
link to live page: https://mysterious-eyrie-11891.herokuapp.com/closet

the process of getting CRUD was pretty smooth. But I did find it difficult to tweak of change those "templates" after having them work and show what I needed them to. Getting the images to show up instead of the links was the first challenge and Alexis helped me add the <%closet[i].image %> because I had a different variation of that.

for a challenge after getting everything to work I decided to work on a search bar/input. the route was very difficult and I did a lot pseudo code. after some trial and errors and many videos Sage shared a video and structures that would be helpful and I tweaked it but it was not yet doing what I needed it to.

Yulia and Brendan worked with me to further tweak the path and suggested I work with the index.ejs rather than the search.ejs I had created to avoid bugs. It started showing me one of my outfits and its tags but i couldnt tap into the others I changes the 0 to i and it started tapping into the first thing in each of the objects arrays of tags.

server.js search route attempts:

// url route to search ejs
//closet.find( passing property i am seraching(req.body?) and (value user submits [String]?) (err, foundOutfit))
//res.render('foundOutfit')
——————————
app.get('/closet/search', (req, res)=>{
    Closet.find({tags:[String]}, (err, findOutfit)=>{
        res.render(
            'search.ejs',
            {
                closet: findOutfit
            }
        ) 
    })
})

——————————
app.get('/closet/search', (req, res)=>{
    Closet.find(req.params.tags, tags,(err, findOutfit)=>{
        res.render(
            'search.ejs',
            {
                closet: findOutfit
            }
        ) 
    })
})
————————————
app.get('/closet/search', (req, res)=>{
    Closet.find(req.params.tags, {tags:tags},(err, findOutfit)=>{
        if(err){
            res.render(
                'search.ejs',
                {
                    tags: null,
                })
        } console.log("tag not found - try again");
        res.render(
            'search.ejs',
            {
                closet: findOutfit
            }
        ) 
    })
})

———————————
Kinda works (best shot - looked at it with Brendan and Yulia) Brendan said to have it render on the main closet page instead of a search pjs and to change the tags part

app.get('/closet/search/:tags', (req, res)=>{
    // const tags = req.params.tags;
    Closet.find({tags: req.params.tags},(err, findOutfit)=>{
        if(err){
            res.render(
                'search.ejs',
                {
                    tags: null,
                })
        console.log("tag not found - try again");

        } else {
            console.log(findOutfit)
        res.render(
            'search.ejs',
            {
                closet: findOutfit
            }
        )
        }
    })

})

I realized the new outfits and edits were not saving as arrays. Had to change my serve.js for the new and edit to include .split(',') so it would save as an array in the database. Alexis suggested doing separate input fields on new and edit pages to have them save as separate indices.

app.post('/closet', (req, res)=>{
    Closet.create({
        image: req.body.image,
        type: req.body.type,
        season: req.body.season,
        feels: req.body.feels,
        tags: req.body.tags.split(',')
    }, (err, createdOutfit)=>{
        res.redirect('/closet')
    })
})

Styling was tough with bootstrap. I thought it would be easier but applying the classes as they explained didnt necessarily make each thing behave or look as I wanted it to so I added my own css. My other challenge I wanted to accomplish was a carousel on my index to display one outfit at a time but I tried different times and couldnt figure out how to make the loop work with the set up bootstrap showed. I tried moving around divs and classes but it only made the images stack. I also tried making cards and a flexbox as we had practiced in class but didnt get very far with that.

I feel like I can pick up on patterns and have a general idea of how something should look or work but I am still struggling to apply what we've learned affectively (if else statements, loops, scriptlets, css). I am not feeling like I have picked up any researching skills and would like more tips on how to best approach a search.

With more time I would like to complete the search bar and actually make it connect with the index so that when the user inputs a tag the app prints the outfit with the matching tag or a "there are not matching tags-try again" message. Further the styling to incorporate the carousel and figure out how to input pictures from a phone (not w the image adress/url)
data = d3.csv("assets/data/dataset.csv");
let id = 0
let container = d3.select(".container");

//header
container.append('div')
    .attr('class', 'col')
    .attr('id', 'colSx')
    .append('div')
    .attr('class', 'flex-row head sub')
    
    .append('div')
    .attr('id', 'recTextUx')
    .style('display', 'none')
    .style('cursor', 'pointer')
    .attr('class', 'roundTag explAll')
    .on('click', function () { closeArchive(); closedRecipes() })
    .append('img')
    .attr('src', './assets/icon/leftArrow.svg')

d3.select('#colSx').select('.sub')
.style('justify-content', 'flex-start').style('gap', '5px')
    .append('p')
    .text('recipes')   
 
container.select('#colSx')
    .append('div')
    .attr('id', 'all-filters')
    .attr('class', 'flex-row filter')

let openAllArchiveBoulean = false;

//colonna dx (all products)
container.append('div')
    .attr('class', 'col-md-auto')
    .attr('id', 'colDx')

// subhead
container.select('#colDx')
    .append('div')
    .attr('class', 'flex-row head sub')
    .append('div')
    .attr('class', 'flex-row nOfR')
let nOfR = container.select('.nOfR')
nOfR
    .append('p')
    .text('products')
nOfR
    .append('p')
    .text('n')
    .attr('id', 'productsSubhead')

container.select('#colDx').select('.sub')
    .append('div')
    .attr('class', 'roundTag explAll')
    .attr('id', 'openAllArchiveTitle')

    //tag icon
    d3.select('#openAllArchiveTitle').append('img')
        .attr('src', './assets/icon/asterisk.svg')
        .style('order', '0')
    //tag name
    d3.select('#openAllArchiveTitle').append('p')
    // .attr('id', 'productsSubhead')
        .text('explore all')

    d3.select('#openAllArchiveTitle')
    .on('click', function () {
        if (openAllArchiveBoulean == false) {
            openAllArchive()
        }
        else { closeArchive(); closedRecipes() }
    })
    .style('cursor', 'pointer')

container.select('#colDx')
    .append('div')
    .attr('id', 'prepDiv')
    .attr('class', 'flex-column')


/////////////////////////////////////// statistics
let prepDiv = d3.select('#prepDiv')

prepDiv.append('img')
    .attr('src', 'assets/imgs/preparation.png')
    .attr('id', 'statImg')

for (let st = 4; st <= 18; st++) {
    //RIGA DEL TITOLO
    if ((st == 4) || (st == 6) || (st == 13) || (st == 14) || (st == 17)) {
        prepDiv
            .append('div')
            .attr('class', 'flex-row recipe-row' + st)
            .style('order', function () {
                if (st == 4) { return 0 }
                else if (st == 6) { return 2 }
                else if (st == 13) { return 8 }
                else if (st == 14) { return 11 }
                else if (st == 17) { return 13 }
            })
        //tags row
        let nOfTagsNeeded
        if (st == 4) { nOfTagsNeeded = 2 } else { nOfTagsNeeded = 1 }
        for (let stt = 0; stt < nOfTagsNeeded; stt++) {
            if (stt == 0) {
                d3.select('.recipe-row' + st).append('p')
                    .attr('class', 'preptitle')
                    .text(function () {
                        if (st == 6) { return 'Selected Keyword :' }
                        else { return 'Selected tags :' }
                    })
            }
            d3.select('.recipe-row' + st)
                .append('div')
                .attr('class',
                    function () {
                        if (st == 14 || st == 17) { return 'squareTag t' + stt }
                        else { return 'roundTag t' + stt }
                    }
                )
                .style('background-color',
                    function () {
                        if (st == 14 || st == 17) { return '#dddddd' }
                    }
                )
            d3.select('.recipe-row' + st).select('.t' + stt)
                .append('img')
                .attr('src', function () {
                    if (st == 6 || st == 13) { return 'assets/icon/keyword.svg' }
                    if (st == 14) { return 'assets/icon/action.svg' }
                    if (st == 17) { return 'assets/icon/data.svg' }
                    else { return 'assets/icon/topic.svg' }
                })
            d3.select('.recipe-row' + st).select('.t' + stt).append('p')
                .text(function () {
                    if (st == 6 || st == 13) { return 'keywords' }
                    if (st == 14) { return 'aim' }
                    if (st == 17) { return 'evidence' }
                    else { return 'topic' }
                })


        }
    } // RIGA DESCRIZIONE
    else if ((st == 5) || (st == 15) || (st == 16) || (st == 18)) {
        prepDiv.append('p')
            .attr('class', 'prepText recipe-row' + st)
            .style('height', 'auto')
            .text(function () {
                if (st == 15) { return generalStat[1].text }
                else if (st == 16) { return generalStat[2].text }
                else if (st == 18) { return generalStat[3].text }
            })
            .style('order', function () {
                if (st == 5) { return 1 }
                else if (st == 15) { return 9 }
                else if (st == 16) { return 12 }
                else if (st == 18) { return 14 }
            })
    }
    //RIGA ISTOGRAMMA
    else if (st == 9 || st == 10) {
        prepDiv
            .append('div')
            .attr('class', 'flex-row recipe-row' + st)
            .style('order', function () {
                if (st == 9) { return 7 }
                else if (st == 10) { return 10 }
            })

        for (let stt = 0; stt < generalStat[st - 9].nOfData; stt++) {
            //create divs for each voice
            d3.select('.recipe-row' + st)
                .style('height', '200px')
                .append('div')
                .attr('class', 'flex-column rr' + stt)
                .style('align-items', 'center')
                .style('justify-content', 'flex-end')
                .style('align-content', 'center')
                .style('gap', '5px')
                .style('height', '100%')
                .style('cursor', function () { if (st == 10) { return 'pointer' } })


                //append tag
                .append('div')
                .attr('class', 'roundTag s t' + stt)
                .style('order', '2')
                .style('opacity', function () { if (st == 10 && stt > 0) { return '0' } })
                .style('max-width', function () { if (st == 10 && stt > 0) { return '0px' } })
                .style('transition', ' max-width 1000ms ease')

            d3.select('.recipe-row' + st).select('.rr' + stt)
                .on('mouseover', function () { if (st == 10 && stt > 0) { d3.select('.recipe-row' + st).select('.t' + stt).style('opacity', '1').style('max-width', '150px') } })
                .on('mouseout', function () { if (st == 10 && stt > 0) { d3.select('.recipe-row' + st).select('.t' + stt).style('opacity', '0').style('max-width', '0px') } })

            //tag icon
            d3.select('.recipe-row' + st).select('.t' + stt)
                .append('img')
                .attr('src', function () {
                    if (st == 9) { return './assets/icon/topic.svg' }
                    else if (st == 10) { return './assets/icon/keyword.svg' }
                }
                )
            //tag name
            d3.select('.recipe-row' + st).select('.t' + stt).append('p')
                .text(function () { return generalStat[st - 9]["d" + stt] })
            //append rectangle
            d3.select('.recipe-row' + st).select('.rr' + stt)
                .append('div')
                .attr('class', 'histogramDiv')
                .style('order', '0')
                .append('div')
                .attr('class', 'statRec histogramTopic')
                .style('height', 'calc(' + ((generalStat[st - 9]['v' + stt]) * 100 / (generalStat[st - 9].v0)) + '%')
                .style('background-color', function () {
                    if (st == 9) { return 'var(--secondary-color)' }
                    else if (st == 10) { return 'var(--primary-color)' }
                })
            //append rectangleValue
            d3.select('.recipe-row' + st).select('.rr' + stt)
                .append('p')
                .attr('class', 'nPercText')
                .text(function () { return generalStat[st - 9]['v' + stt] })
                .style('order', '1')
        }
    }
    //RIGA GRAFICI ORIZZONTALI
    else if (st == 7 || st == 8 || st == 11 || st == 12) {
        prepDiv
            .append('div')
            .attr('class', 'flex-row recipe-row' + st)
            .style('order', function () {
                if (st == 7) { return 3 }
                else if (st == 8) { return 4 }
                else if (st == 11) { return 13 }
                else if (st == 12) { return 16 }
            })
        // % sx
        d3.select('.recipe-row' + st)
            .append('p')
            .text(function () {
                if (st == 11) { return generalStat[2].v0 + '%' }
                else if (st == 12) { return generalStat[3].v0 + '%' }
            }
            )
            .attr('class', 'nPercText')
            .style('order', '1')
        //action tags
        for (let stt = 0; stt < 2; stt++) {
            d3.select('.recipe-row' + st)
                .append('div')
                .attr('class', 'squareTag s t' + stt)
                .style('order', function () {
                    if (stt == 0) { return 0 }
                    else { return 4 }
                })
            d3.select('.recipe-row' + st).select('.t' + stt)
                .append('img')
                .attr('src', function () {
                    if ((st == 7) || (st == 11)) {
                        if (stt == 0) {
                            return 'assets/icon/action.svg'
                        } else { return 'assets/icon/dissemination.svg' }
                    }
                    else {
                        if (stt == 0) {
                            return 'assets/icon/data.svg'
                        } else { return 'assets/icon/groundless.svg' }
                    }
                })
            //evidence
            d3.select('.recipe-row' + st).select('.t' + stt).append('p')
                .text(function () {
                    if ((st == 7) || (st == 11)) {
                        if (stt == 0) {
                            return 'take action'
                        } else { return 'dissemination' }
                    }
                    else {
                        if (stt == 0) {
                            return 'data'
                        } else { return 'no data' }
                    }
                })
                .style('width', '68px')
        }
        // % dx
        d3.select('.recipe-row' + st)
            .append('div')
            .attr('class', 'statRec')
            .style('order', '2')
            .append('div')
            .attr('class', 'statRecActive')
            .style('width', function () {
                if (st == 11) { return generalStat[2].v0 + '%' }
                else if (st == 12) { return generalStat[3].v0 + '%' }
            })
        d3.select('.recipe-row' + st)
            .append('p')
            .text(function () {
                if (st == 11) { return generalStat[2].v1 + '%' }
                else if (st == 12) { return generalStat[3].v1 + '%' }
            })
            .attr('class', 'nPercText')
            .style('order', '3')
    }

}


/////////////////////////////////////// products

// Load data
container.select('#colDx')
    .append('div')
    .attr('id', 'all-cards')
    .attr('class', 'card-columns')

let cards = d3.select("#all-cards")

data.then(function (data) {
    let card = cards.selectAll("div")
        .data(data)
        .join("div")
        .attr("class", "flex-column card")
    //card header
    card.append("div")
        .attr("class", "flex-column cardHeader")
        .append('p')
        .text(function (d) { return d.Company })
    card.select('.cardHeader')
        .append('a')
        .attr('href', function (d) { return d.Url })
        .attr('target', '_blank')
        .append('img')
        .attr('src', 'assets/icon/link.svg')
    //context 
    card.append("p")
        .attr("class", "card-content")
        .text(function (d) {
            return d.Context
        })
        .style('text-transform', function (d) {
            if ((d.Typology == 'title') || (d.Typology == 'subtitle')) { return 'uppercase' }
        })
        .style('font-style', function (d) {
            if (d.Typology == 'statement') { return 'italic' }
        })
        //context underline with mark.js
        .attr('onload', function (d) {
            var cardContext = card.selectAll('.card-content').nodes()[id]
            var instance = new Mark(cardContext)
            instance.mark(d.Keyword, { 'accuracy': 'complementary' })
            id++
        })


    //tags
    card.append("div")
        .attr("class", "flex-row cardFooter")
    var allBtns = ['Keyword', 'Animal', 'Distribution', 'Resources', 'Food', 'Management', 'Waste', 'Actions', 'Evidence', 'Aim'];

    for (let i = 0; i < allBtns.length; i++) {
        card.select(".cardFooter")
            .append('div')
            .attr("class", function () {
                if (i < 8) { return "flex-row roundTag " + allBtns[i] }
                else { return "flex-row squareTag " + allBtns[i] }
            })
        var tag = card.select('.' + allBtns[i])
            .style('display', function (d) {
                if (i > 0 && i <= 7) {
                    if (d[allBtns[i]] == 'FALSE') {
                        return 'none'
                    } else { return 'flex' }
                }
            })

        tag.append('img')
            .attr('src', function (d) {
                if (i == 0) { return 'assets/icon/keyword.svg' }
                else if (i <= 7) { return 'assets/icon/topic.svg' }
                else if (i == 8) {
                    if (d.Evidence == 'TRUE') { return 'assets/icon/data.svg' } else { return 'assets/icon/groundless.svg' }
                }
                else {
                    if (d.Aim == 'take action') { return 'assets/icon/action.svg' } else { return 'assets/icon/dissemination.svg' }
                }
            })
        tag.append("p")
            .text(function (d) {
                if (i == 0) {
                    return d.Keyword
                }
                else if (i <= 7) { return allBtns[i] }
                else if (i == 8) { if (d.Evidence == 'TRUE') { return 'data' } else if (d.Evidence == 'FALSE') { return 'no data' } }
                else if (i == 9) { return d.Aim }
            })
    }
})



/////////////////////////////////////// recipes

let filterDiv = d3.select("#all-filters")
filterDiv.append('img')
    .attr('id', 'archiveImgSide')
    .attr('src', 'assets/imgs/ArchiveSide.png')
//load data from recipes.js
let filter = filterDiv.selectAll("div")
    .data(recipes)
    .join("div")
    .attr("class", "flex-column recipe")
filter.attr('id', function (d) { return 'recipe' + d.recipeId })

filter.append("svg").attr("width", 50).attr("height", 50).style('background-color', 'white').style('border', '2px solid').style('margin-left', '198px').style('margin-top', '-1px').attr('class', 'orecchio')
filter.append("svg").attr("width", 50).attr("height", 50).style('background-color', 'white').style('margin-left', '200px').style('margin-top', '-52px').attr('class', 'orecchio')
filter.append("svg").attr("width", 50).attr("height", 50).style('background-color', 'transparent').style('margin-left', '198px').style('margin-top', '-49px').attr('class', 'orecchio')
    .append('line').style("stroke", "#000000").style("stroke-width", 2).attr("x1", 0).attr("y1", 0).attr("x2", 200).attr("y2", 200).attr('class', 'orecchio')

filter.append("div")
    .attr("class", "flex-column card-body")
var filterBody = filter.select('.card-body')
//title
filterBody
    .append('p')
    .attr("class", "card-text")
    .text(function (a) {
        return a.title
    })
//description
filterBody
    .append('p')
    .text(function (d) { return d.desc })
    .attr('class', 'quote')
filterBody
    .append('h5')
    .text('ingredients')

//tags (ingredients)
let recipeIngredientTitle = ['Keyword', 'Topic', 'Aim', 'Evidence']; //iterate x each row
for (let i = 0; i < recipeIngredientTitle.length; i++) {
    filterBody
        .append('div')
        .attr("class", "flex-row recipe-row" + i)
    let recipeRow = filterBody.select('.recipe-row' + i)
    recipeRow
        .append('div')
        .attr("class", "recipe-ingredient-title")
        .append('p')
        .text(function () {
            return recipeIngredientTitle[i] + ' :'
        })
    recipeRow
        .append('div')
        .attr("class", "flex-column recipe-row-T" + i)
    let recipeRowT = recipeRow.select('.recipe-row-T' + i)


    //tags in each row
    let nOfTags = 1
    if (i == 1) { nOfTags = 2 } else { nOfTags = 1 }
    for (let j = 0; j < nOfTags; j++) {
        recipeRowT.append('div')
            .attr("class", "flex-row roundTag" + i)
        var tag = recipeRowT.select(".roundTag" + i)
            .attr('class', function () {
                if (i < 2) { return "roundTag" }
                else { return "squareTag" }
            })
        if (i == 0) { tag.style("background-color", "var(--primary-color)") }
        if (i == 1) { tag.style("background-color", "var(--secondary-color)") }
        tag.append('img')
            .attr('src', function (d) {
                if (i == 0) { return 'assets/icon/keyword.svg' }
                else if (i == 1) { return 'assets/icon/topic.svg' }
                else if (i == 2) {
                    if (d.Aim == 'take action') { return 'assets/icon/action.svg' } else { return 'assets/icon/dissemination.svg' }
                }
                else {
                    if (d.Evidence == 'TRUE') { return 'assets/icon/data.svg' } else { return 'assets/icon/groundless.svg' }
                }
            })

        tag.append("p")
            .text(function (d) {
                //create array of topic tags
                let recipeTopicArray = []
                if (i == 0) { return d.Keyword }
                else if (i == 1) {
                    if (d.Animal == 'TRUE') { recipeTopicArray.push('Animal') }
                    if (d.Distribution == 'TRUE') { recipeTopicArray.push('Distribution') }
                    if (d.Resources == 'TRUE') { recipeTopicArray.push('Resources') }
                    if (d.Food == 'TRUE') { recipeTopicArray.push('Food') }
                    if (d.Management == 'TRUE') { recipeTopicArray.push('Management') }
                    if (d.Waste == 'TRUE') { recipeTopicArray.push('Waste') }
                    if (d.Actions == 'TRUE') { recipeTopicArray.push('Actions') }

                    // return the 2 topics for each recipe
                    if (j == 0) { return recipeTopicArray[0] }
                    else { return recipeTopicArray[1] }
                }
                //aim tag
                else if (i == 2) {
                    return d.Aim
                }
                //evidence tag
                else if (i == 3) {
                    if (d.Evidence == 'TRUE') { return 'data' } else if (d.Evidence == 'FALSE') { return 'no data' }
                }
            })
    }
}


/////////////////////////////////////// archive engine
var archiveOpen = false
filter
    .style('cursor', 'pointer')
    //detect wich recipe I've clicked
    .on('click', function (btnId) {
        recipeClicked = btnId.srcElement.__data__.recipeId;
        let recipeIdN = recipes[btnId.srcElement.__data__.recipeId];
        //select all products
        let card = d3.select("#all-cards").selectAll('.card')
        card
            .style('display', 'none') //hide them all
        let cardSelected = card
            .filter(function (d) { //filter: results only the products that fullfits the recipe requirements
                return (
                    (((d.Aim == recipeIdN.Aim) || (recipeIdN.Aim == undefined)) &&
                        ((d.Keyword == recipeIdN.Keyword) || (recipeIdN.Keyword == undefined)) &&
                        ((d.Evidence == recipeIdN.Evidence) || (recipeIdN.Evidence == undefined)) && (
                            (d.Actions == recipeIdN.Actions) ||
                            (d.Animal == recipeIdN.Animal) ||
                            (d.Distribution == recipeIdN.Distribution) ||
                            (d.Resources == recipeIdN.Resources) ||
                            (d.Food == recipeIdN.Food) ||
                            (d.Management == recipeIdN.Management) ||
                            (d.Waste == recipeIdN.Waste)))
                )
            })
        cardSelected
            .style('display', 'inline-flex') //return display to selected products


        // engine to highlight active tags
        let cardP = cardSelected.select('.cardFooter').selectAll('div').select('p');
        let tagsActive = [] //push here active recipes tags requirements
        for (let j = 0; j < Object.keys(recipeIdN).length; j++) {
            let key = Object.keys(recipeIdN)[j]
            if (recipeIdN[key] == 'TRUE') {
                tagsActive.push(key)
            }
        } // check if product tags fullfits the requirements
        for (let i = 0; i < cardSelected.select('.cardFooter').selectAll('div').nodes().length; i++) {
            //topics
            if ((cardP.nodes()[i].innerText.localeCompare(tagsActive[0], 'en', { sensitivity: 'base' }) == 0) || (cardP.nodes()[i].innerText.localeCompare(tagsActive[1], 'en', { sensitivity: 'base' }) == 0)) {
                cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'var(--secondary-color)' //return color purple
            }//keyword
            else if (cardP.nodes()[i].innerText.localeCompare(recipeIdN.Keyword, 'en', { sensitivity: 'base' }) == 0) {
                cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'var(--primary-color)' //return color green
            }//else 
            else { cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'white' } //return white
        }

        // input to open the archive
        openRecipe(btnId)
        if (archiveOpen == false) {
            openArchive()
        }
        //n. of products displayed
        let productsSubhead = d3.select("#productsSubhead")
        let totResults = cardSelected.size()
        productsSubhead.text(function () {
            return '(' + totResults + ' results)'
        })

        /////////////////////////////////////statistics engine
        //tags
        d3.select('.recipe-row4').select('.t0').select('p')
            .text(function () { return tagsActive[0] })
        d3.select('.recipe-row4').select('.t1').select('p')
            .text(function () { return tagsActive[1] })
        d3.select('.recipe-row6').select('.t0').select('p')
            .text(function () { return recipeIdN.Keyword })
        d3.select('#prepDiv').select('.prepText')
            .text(function () { return recipeIdN.StatisticText })
        d3.select('.statRecActive')
            .style('width', function () { return recipeIdN.TaPerc + '%' })
        d3.select('.recipe-row7').selectAll('.nPercText')
            .filter(function () {
                return this.style.order == 1
            })
            .text(function () { return recipeIdN.TaPerc + '%' })
        d3.select('.recipe-row7').selectAll('.nPercText')
            .filter(function () {
                return this.style.order == 3
            })
            .text(function () { return 100 - recipeIdN.TaPerc + '%' })
        d3.select('.recipe-row8').select('.statRecActive').style('width', function () { return recipeIdN.GrPerc + '%' })
        d3.select('.recipe-row8').selectAll('.nPercText')
            .filter(function () {
                return this.style.order == 1
            })
            .text(function () { return recipeIdN.GrPerc + '%' })
        d3.select('.recipe-row8').selectAll('.nPercText')
            .filter(function () {
                return this.style.order == 3
            })
            .text(function () { return 100 - recipeIdN.GrPerc + '%' })
    });



////////////////////////////////////// archivio 'explore all'
//filters
let formArrayTitles = ['Keyword', 'Topic', 'Aim', 'Evidence']
//filters options
let formArray = {
    Keyword: ['greenhouse gas', 'impact', 'sustainability', 'commitment', 'energy', 'responsibility', 'environmental', 'planet', 'recycle', 'emissions', 'natural', 'deforestation', 'green', 'climate change', 'carbon footprint', 'renewable energy', 'single-use', 'organic', 'eco-friendly', 'biodegradable', 'net-zero', 'zero-waste', 'preservation', 'reforestation'],
    Topic: ['Actions', 'Animal', 'Distribution', 'Resources', 'Food', 'Management', 'Waste'],
    Aim: ['take action', 'dissemination'],
    Evidence: ['TRUE', 'FALSE']
}
d3.select('#colSx')
    .append('div')
    .attr('class', 'flex-row filter all')
    .attr('id', 'filtriCustom')
let filtriCustom = d3.select('#colSx').select('#filtriCustom')

//create form
for (let f = 0; f < formArrayTitles.length; f++) {
    filtriCustom
        .append('form')
        .attr('id', 'divFormK' + f)
    let divFormK = d3.select('#divFormK' + f)
    divFormK
        .append('label')
        .attr('for', function () { return formArrayTitles[f] })
        .text(function () { return formArrayTitles[f] })

    //take data from form click and push them to the "ghost recipe obj"
    divFormK
        .append('select')
        .on('change', function () {
            let card = d3.select("#all-cards").selectAll('.card')
            //topic
            if (this.name == 'Topic') {
                for (let v = 0; v < formArray.Topic.length; v++) {
                    if (formArray.Topic[v] == this.value) {
                        ghostRecipe[formArray.Topic[v]] = 'TRUE'
                    }
                    else { ghostRecipe[formArray.Topic[v]] = 'undefined' }
                }
            } else { ghostRecipe[this.name] = this.value }

            card
                .style('display', 'none')
            let cardSelected = card
                //filter product (same as before, but with the custom recipe created)
                .filter(function (d) {
                    return (
                        (((d.Aim == ghostRecipe.Aim) || (ghostRecipe.Aim == 'undefined')) &&
                            ((d.Keyword == ghostRecipe.Keyword) || (ghostRecipe.Keyword == 'undefined')) &&
                            ((d.Evidence == ghostRecipe.Evidence) || (ghostRecipe.Evidence == 'undefined'))
                            && (
                                (d.Actions == ghostRecipe.Actions) ||
                                (d.Animal == ghostRecipe.Animal) ||
                                (d.Distribution == ghostRecipe.Distribution) ||
                                (d.Resources == ghostRecipe.Resources) ||
                                (d.Food == ghostRecipe.Food) ||
                                (d.Management == ghostRecipe.Management) ||
                                (d.Waste == ghostRecipe.Waste) ||
                                ((ghostRecipe.Actions == 'undefined') &&
                                    (ghostRecipe.Animal == 'undefined') &&
                                    (ghostRecipe.Distribution == 'undefined') &&
                                    (ghostRecipe.Resources == 'undefined') &&
                                    (ghostRecipe.Food == 'undefined') &&
                                    (ghostRecipe.Management == 'undefined') &&
                                    (ghostRecipe.Waste == 'undefined')))
                        )
                    )
                })
            cardSelected
                .style('display', 'inline-flex')
            //change n.of product displayed
            let productsSubhead2 = d3.select("#productsSubhead")
            let totResults2 = cardSelected.size()
            productsSubhead2.text(function () {
                return 'products (' + totResults2 + ')'
            })
            //reset scroll when recipe click
            document.getElementById('colDx').scrollTo({
                top: 1000,
                left: 0,
                behavior: 'smooth'
            });

            // highlight active tags (same as before)
            let cardP = cardSelected.select('.cardFooter').selectAll('div').select('p');
            let tagsActive = []

            for (let j = 0; j < Object.keys(ghostRecipe).length; j++) {
                let key = Object.keys(ghostRecipe)[j]
                if (ghostRecipe[key] == 'TRUE') {
                    tagsActive.push(key)
                }
            }
            for (let i = 0; i < cardSelected.select('.cardFooter').selectAll('div').nodes().length; i++) {
                if ((cardP.nodes()[i].innerText.localeCompare(tagsActive[0], 'en', { sensitivity: 'base' }) == 0)) {
                    cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'var(--secondary-color)'
                }
                else if (cardP.nodes()[i].innerText.localeCompare(ghostRecipe.Keyword, 'en', { sensitivity: 'base' }) == 0) {
                    cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'var(--primary-color)'
                }
                else { cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'white' }
            }
        })

        .attr('id', 'formK' + f)
        .attr('name', function () { return formArrayTitles[f] })
        .attr('class', function () { if (f < 2) { return 'roundTag' } else { return 'squareTag' } })
        .style('background-color', function () {
            if (f == 0) { return 'var(--primary-color)' }
            else if (f == 1) { return 'var(--secondary-color)' }
        })

    let formK = d3.select('#formK' + f)

    formK
        .append('option')
        .attr('value', 'undefined')
        .text('--Select')

    for (let k = 0; k < formArray[formArrayTitles[f]].length; k++) {
        formK
            .append('option')
            .attr('value', formArray[formArrayTitles[f]][k])
            .text(function () {
                if (f == 3) {
                    if (formArray[formArrayTitles[f]][k] == 'TRUE') {
                        return 'data'
                    } else if (formArray[formArrayTitles[f]][k] == 'FALSE') {
                        return 'no data'
                    }
                } else if (f != 3) { return formArray[formArrayTitles[f]][k] }
            })
    }
}
//reset filters
filtriCustom
    .append('div')
    .attr('class', 'explAll roundTag')
    .append('p')
    .attr('id', 'resetBtn')
    .text('reset')
    .on('click', function () {
        // for (let i = 0; i < d3.select("#all-cards").selectAll('.card').select('.cardFooter').selectAll('div').nodes().length; i++) {
        //     d3.select("#all-cards").selectAll('.card').select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'white' 
        // }
        document.getElementById('divFormK0').reset()
        document.getElementById('divFormK1').reset()
        document.getElementById('divFormK2').reset()
        document.getElementById('divFormK3').reset()
        let card = d3.select("#all-cards").selectAll('.card')
        card.style('display', 'inline-flex')
        let arrayReset = ['Keyword', 'Topic', 'Aim', 'Evidence', 'Actions', 'Animal', 'Distribution', 'Resources', 'Food', 'Management', 'Waste']

        for (let ar = 0; ar < arrayReset.length; ar++) {
            ghostRecipe[arrayReset[ar]] = 'undefined'
        }
        for (let r = 0; r < 10; r++) {
            ghostRecipe;
        }
        //reset n.of product text
        let productsSubhead3 = d3.select("#productsSubhead")
        let totResults3 = card.size()
        productsSubhead3.text(function () {
            return 'products (' + totResults3 + ')'
        })
        //reset scroll
        document.getElementById('colDx').scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    })


//function to close recipes (reset it to initial values)
function closedRecipes() {
    let filterDiv = d3.select("#all-filters")
    let filter = filterDiv.selectAll(".recipe");
    for (let j = 0; j < recipes.length; j++) {
        for (let i = 0; i < 4; i++) {
            filter.selectAll('.orecchio')._groups[j][i].style.display = 'block'
        }
        filter.select('.card-body').select('.card-text')._groups[0][j].style.marginTop = "-50px"
        filter._groups[0][j].style.opacity = '1'
    }
}

//function to open recipe
function openRecipe(btnId) {
    //display all cards if clicked on explore all
    if (btnId == 0) {
        let card = d3.select("#all-cards").selectAll('.card')
        card.style('display', 'inline-flex')

        //change result txt
        let productsSubhead = d3.select("#productsSubhead")
        let totResults = card.size()
        productsSubhead.text(function () {
            return 'products (' + totResults + ')'
        })

    } else {
        recipeClicked = btnId.srcElement.__data__.recipeId;
        for (let j = 0; j < recipes.length; j++) {
            //format to apply at not clicked recipes
            if (j != recipeClicked) {
                if (archiveOpen == false) {
                    filter._groups[0][j].style.order = '1'
                }
                for (let i = 0; i < 4; i++) {
                    filter.selectAll('.orecchio')._groups[j][i].style.display = 'block'
                }
                filter.select('.card-body').select('.card-text')._groups[0][j].style.marginTop = "-50px"

                filter._groups[0][j].style.opacity = '0.3'
            }
            else if (j == recipeClicked) {
                //format to apply to active recipe
                if (archiveOpen == false) {
                    filter._groups[0][j].style.order = '0'
                }
                for (let i = 0; i < 4; i++) {
                    filter.selectAll('.orecchio')._groups[j][i].style.display = 'none'
                }
                filter.select('.card-body').select('.card-text')._groups[0][j].style.marginTop = "0"
                filter._groups[0][j].style.opacity = '1'

                let ricMarginTop = filter._groups[0][j].getBoundingClientRect().top
                document.getElementById('all-filters').scrollBy({
                    top: ricMarginTop - 140,
                    left: 0,
                    behavior: 'smooth'
                });
                document.getElementById('colDx').scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

}



//function to open archive (col dx)
function openArchive() {
    archiveOpen = true

    // d3.select('#prepDiv').style('height', 'auto').style('min-height', 350 + 'px').style('padding', 70 + 'px ' + 0 + 'px ' + 30 + 'px ' + 0 + 'px')

    d3.select('#recTextUx').style('display', 'flex')

    d3.select('.container').selectAll('.col')
        .style('max-width', 'auto')
        .transition()
        .delay(0)
        .duration(2000)
        .style('width', '300px')

    d3.select('.container').selectAll('.col-md-auto')
        .style('max-width', 'calc(100% - 300px)')
        .transition()
        .delay(0)
        .duration(2000)
        .style('width', '100%')

    d3.select('#archiveImgSide')
        .style('display', 'none')

    d3.select('#all-cards').style('padding-top', '40px')

    for (let count = 9; count <= 18; count++) {
        d3.select('.recipe-row' + count).style('display', 'none')
    }
}

//function to close archive (reset to initial conditions)
function closeArchive() {
    openAllArchiveBoulean = false;
    archiveOpen = false
    document.getElementsByClassName('card-columns')[0].style.columnCount= Math.floor((window. innerWidth-300)/250)


    if (archiveOpen == false) {
        filter.style('order', '1')
    }
    d3.select('#recTextUx').style('display', 'none')

    d3.select('.container').selectAll('.col')
        .style('max-width', '100%')
        .transition()
        .delay(0)
        .duration(2000)
        .style('width', ' width: 100%;')
    d3.select('.container').selectAll('.col-md-auto')
        .style('max-width', 'calc(100% - 300px)')
        .transition()
        .delay(0)
        .duration(2000)
        .style('width', '0%')

    document.getElementById('all-filters').scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    d3.select('#archiveImgSide')
        .transition()
        .delay(1500)
        .style('display', 'initial')

    d3.selectAll('#all-filters')
        .style('display', 'flex')
    d3.selectAll('#filtriCustom')
        .style('display', 'none')

    d3.selectAll('#all-filters')
        .style('opacity', '1')

    //reset standard stat interface
    const t = d3.timer((elapsed) => {
        d3.select('#prepDiv').node().style.padding = '70px 0px 30px 0px'
        d3.select('#statImg').style('display', 'block')
        d3.select('.recipe-row4').select('.t1')
            .style('display', 'flex')
        d3.select('.recipe-row4').select('.preptitle')
            .style('display', 'flex')
        d3.select('.recipe-row13').select('.preptitle')
            .style('display', 'flex')
        d3.select('.recipe-row14').select('.preptitle')
            .style('display', 'flex')
        d3.select('.recipe-row17').select('.preptitle')
            .style('display', 'flex')
        d3.select('.prepText')
            .text(function () { return generalStat[0].text })
        d3.select('.recipe-row6').style('display', 'flex')
        d3.select('.recipe-row7').style('display', 'flex')
        d3.select('.recipe-row8').style('display', 'flex')
       
        d3.select('#openAllArchiveTitle').select('p')
        .text('Explore all')
        d3.select('#openAllArchiveTitle').select('img')
        .attr('src', './assets/icon/asterisk.svg')

        t.stop();
    }, 1500);
}


//function to open all archive ('explore all')
function openAllArchive() {
    openAllArchiveBoulean = true;
    document.getElementsByClassName('card-columns')[0].style.columnCount= Math.floor((window. innerWidth-200)/250)

    d3.select('#openAllArchiveTitle').select('p')
        .text('Close')
        d3.select('#openAllArchiveTitle').select('img')
        .attr('src', './assets/icon/x-close.svg')
    openRecipe(0)

    document.getElementById('colDx').scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    /////////////////////////////////////statistics engine
    //general statistic interface
    d3.select('.recipe-row4').select('.t0').select('p')
        .text(function () { return generalStat[0].data })
    d3.select('#prepDiv').node().style.padding = '100px 0px 30px 0px'
    d3.select('#statImg').style('display', 'none')
    d3.select('.recipe-row4').select('.t1')
        .style('display', 'none')
    d3.select('.recipe-row4').select('.preptitle')
        .style('display', 'none')
    d3.select('.recipe-row13').select('.preptitle')
        .style('display', 'none')
    d3.select('.recipe-row14').select('.preptitle')
        .style('display', 'none')
    d3.select('.recipe-row17').select('.preptitle')
        .style('display', 'none')
    d3.select('.prepText')
        .text(function () { return generalStat[0].text })
    d3.select('.recipe-row6').style('display', 'none')
    d3.select('.recipe-row7').style('display', 'none')
    d3.select('.recipe-row8').style('display', 'none')
    for (let count = 9; count <= 18; count++) {
        d3.select('.recipe-row' + count).style('display', 'flex')
    }



    d3.select('.container').selectAll('.col')
        .style('max-width', 'auto')
        .transition()
        .delay(0)
        .duration(2000)
        .style('width', '190px')
    d3.select('.container').selectAll('.col-md-auto')
        .style('max-width', 'calc(100% - 190px)')
        .transition()
        .delay(0)
        .duration(2000)
        .style('width', '100%')


    d3.selectAll('#all-filters')
        .style('display', 'none')

    d3.select('#filtriCustom')
        .style('display', 'flex')
}

//make column responsive
window.addEventListener('resize', function(event) {
    document.getElementsByClassName('card-columns')[0].style.columnCount= Math.floor((window. innerWidth-300)/250)
}, true);
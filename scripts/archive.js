// Interpret the data as the correct format. Use d3.csv or d3.tsv accordingly.
data = d3.csv("assets/data/dataset.csv");
let id = 0
// let recipeClicked = 4;
// Select the container where we will put our HTML elements
let container = d3.select(".container");

container.append('div')
    .attr('class', 'col')
    .attr('id', 'colSx')

    .append('div')
    .attr('class', 'flex-row head sub')
    .append('p')
    .text('recipes')
    .attr('id', 'recTextUx')
    .on('click', function () { closeArchive(); closedRecipes() })
    .style('cursor', 'pointer')
container.select('#colSx')
    .append('div')
    .attr('id', 'all-filters')
    .attr('class', 'flex-row filter')

let openAllArchiveBoulean = false;


container.append('div')
    .attr('class', 'col-md-auto')
    .attr('id', 'colDx')


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
    .append('p')
    .attr('id', 'openAllArchiveTitle')
    .text('explore all')
    .style('text-transform', 'capitalize')
    .style('cursor', 'pointer')
    .on('click', function () {
        if (openAllArchiveBoulean == false) {
            openAllArchive()
        }
        else { closeArchive(); closedRecipes() }
    })


container.select('#colDx')
    .append('div')
    .attr('id', 'prepDiv')
    .attr('class', 'flex-column')

let prepDiv = d3.select('#prepDiv')


prepDiv.append('img')
.attr('src','assets/imgs/preparation.png')
.attr('id', 'statImg')



for (let st = 4; st <= 8; st++) {
    if (st == 4) {
        prepDiv
            .append('div')
            .attr('class', 'flex-row recipe-row' + st)

        for (let stt = 0; stt < 2; stt++) {
            if (stt == 0) {
                d3.select('.recipe-row' + st).append('p')
                .attr('class', 'preptitle')
                .text('Selected tags :')
            }


            d3.select('.recipe-row' + st)
                .append('div')
                .attr('class', 'roundTag t' + stt)
            d3.select('.recipe-row' + st).select('.t' + stt)
                .append('img')
                .attr('src', 'assets/icon/topic.svg')
            d3.select('.recipe-row' + st).select('.t' + stt).append('p')
                .text('topic')
        }
    }
    else if (st == 5) {
        prepDiv.append('p')
            .attr('class', 'prepText')
            .style('height', 'auto')
            .text('testo')
    }
    else if (st == 6) {
        prepDiv
            .append('div')
            .attr('class', 'flex-row recipe-row' + st)

        for (let stt = 0; stt < 1; stt++) {
            d3.select('.recipe-row' + st).append('p')
                .attr('class', 'preptitle')
                .text('Most used Keyword :')

            d3.select('.recipe-row' + st)
                .append('div')
                .attr('class', 'roundTag t' + stt)

            d3.select('.recipe-row' + st).select('.t' + stt)
                .append('img')
                .attr('src', 'assets/icon/keyword.svg')
            d3.select('.recipe-row' + st).select('.t' + stt).append('p')
                .text('topic')
        }
    }
    else {
        prepDiv
            .append('div')
            .attr('class', 'flex-row recipe-row' + st)

        d3.select('.recipe-row' + st)
            .append('p')
            .text('15%')
            .attr('class', 'nPercText')
            .style('order', '1')

        for (let stt = 0; stt < 2; stt++) {
            d3.select('.recipe-row' + st)
                .append('div')
                .attr('class', 'squareTag t' + stt)
                .style('order', function () {
                    if (stt == 0) { return 0 }
                    else { return 4 }
                })
            d3.select('.recipe-row' + st).select('.t' + stt)
                .append('img')
                .attr('src', function () {
                    if (st == 7) {
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
            d3.select('.recipe-row' + st).select('.t' + stt).append('p')
                .text(function () {
                    if (st == 7) {
                        if (stt == 0) {
                            return 'take action'
                        } else { return 'dissemination' }
                    }
                    else {
                        if (stt == 0) {
                            return 'statistics'
                        } else { return 'groundless' }
                    }
                })
                .style('width', function () {
                    if (st == 7) {
                        if (stt == 0) {
                            return '75px'
                        } else { return '95px' }
                    }
                    else {
                        if (stt == 0) {
                            return '75px'
                        } else { return '95px' }
                    }
                })
        }

        d3.select('.recipe-row' + st)
            .append('div')
            .attr('class', 'statRec')
            .style('order', '2')
            .append('div')
            .attr('class', 'statRecActive')

        d3.select('.recipe-row' + st)
            .append('p')
            .text('15%')
            .attr('class', 'nPercText')
            .style('order', '3')
    }

}














container.select('#colDx')
    .append('div')
    .attr('id', 'all-cards')
    .attr('class', 'card-columns')


let cards = d3.select("#all-cards")




// Load data
data.then(function (data) {
    // Join your data to the creation of div elements to the same number of items in your dataset.
    let card = cards.selectAll("div")
        .data(data)
        .join("div")
        .attr("class", "flex-column card")

    // We append to the initial card all the parts required.
    // HEADER
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

        .attr('onload', function (d) {
            var cardContext = card.selectAll('.card-content').nodes()[id]
            var instance = new Mark(cardContext)
            instance.mark(d.Keyword, { 'accuracy': 'complementary' })
            id++
        })



    card.append("div")
        .attr("class", "flex-row cardFooter")
    //tags
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

        // .style('opacity', function (d) {
        //     if (i >= 8) {
        //         if ((d[allBtns[i]] == 'FALSE') || (d[allBtns[i]] == 'dissemination')) {
        //             return "0.3"
        //         }
        //     }
        // })
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
                else if (i == 8) { if (d.Evidence == 'TRUE') { return 'statistics' } else if (d.Evidence == 'FALSE') { return 'groundless' } }
                else if (i == 9) { return d.Aim }
            })

        // tag.style('opacity', function (d) {
        //     if (i == 8) {
        //         if (d[allBtns[i]] == 'TRUE') {
        //             return '1'
        //         } else { return '0.3' }
        //     }
        //     else if (i == 9) {
        //         if (d[allBtns[i]] == 'take action') {
        //             return '1'
        //         } else { return '0.3' }
        //     }
        // })
    }
})



//filter

let filterDiv = d3.select("#all-filters")
filterDiv.append('img')
    .attr('id', 'archiveImgSide')
    .attr('src', 'assets/imgs/ArchiveSide.png')
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
filterBody
    .append('p')
    .attr("class", "card-text")
    .text(function (a) {
        return a.title
    })
filterBody
    .append('p')
    .text(function (d) { return d.desc })
    .attr('class', 'quote')
filterBody
    .append('h5')
    .text('ingredients')


//iterate
let recipeIngredientTitle = ['Keyword', 'Topic', 'Aim', 'Evidence'];
for (let i = 0; i < recipeIngredientTitle.length; i++) {
    filterBody
        .append('div')
        .attr("class", "flex-row recipe-row" + i)
    let recipeRow = filterBody.select('.recipe-row' + i)
    recipeRow
        .append('div')//nome
        .attr("class", "recipe-ingredient-title")
        .append('p')
        .text(function () {
            return recipeIngredientTitle[i] + ' :'
        })
    recipeRow
        .append('div')//nome
        .attr("class", "flex-column recipe-row-T" + i)
    let recipeRowT = recipeRow.select('.recipe-row-T' + i)

    //iterate

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

                    if (j == 0) { return recipeTopicArray[0] }
                    else { return recipeTopicArray[1] }
                }
                else if (i == 2) {
                    // if (d.Aim != undefined) {
                    //     return 'Take action'
                    // } 
                    return d.Aim
                }
                else if (i == 3) {
                    if (d.Evidence == 'TRUE') { return 'statistics' } else if (d.Evidence == 'FALSE') { return 'groundless' }
                }
            })
    }
}


var archiveOpen = false
//fine iterazione
filter
    .style('cursor', 'pointer')
    .on('click', function (btnId) {


        recipeClicked = btnId.srcElement.__data__.recipeId;
        let recipeIdN = recipes[btnId.srcElement.__data__.recipeId];
        let card = d3.select("#all-cards").selectAll('.card')
        card
            .style('display', 'none')
        let cardSelected = card
            .filter(function (d) {
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
            .style('display', 'inline-flex')

        let cardP = cardSelected.select('.cardFooter').selectAll('div').select('p');

        let tagsActive = []

        for (let j = 0; j < Object.keys(recipeIdN).length; j++) {
            let key = Object.keys(recipeIdN)[j]
            if (recipeIdN[key] == 'TRUE') {
                tagsActive.push(key)
            }
        }
        for (let i = 0; i < cardSelected.select('.cardFooter').selectAll('div').nodes().length; i++) {
            if ((cardP.nodes()[i].innerText.localeCompare(tagsActive[0], 'en', { sensitivity: 'base' }) == 0) || (cardP.nodes()[i].innerText.localeCompare(tagsActive[1], 'en', { sensitivity: 'base' }) == 0)) {
                cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'var(--secondary-color)'
            }
            else if (cardP.nodes()[i].innerText.localeCompare(recipeIdN.Keyword, 'en', { sensitivity: 'base' }) == 0) {
                cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'var(--primary-color)'
            }
            else { cardSelected.select('.cardFooter').selectAll('div').nodes()[i].style.backgroundColor = 'white' }
        }




        openRecipe(btnId)
        if (archiveOpen == false) {
            openArchive()

        }

        let productsSubhead = d3.select("#productsSubhead")
        let totResults = cardSelected.size()
        productsSubhead.text(function () {
            return '('+ totResults + ' results)'
        })


        //statistiche
        d3.select('.recipe-row7').select('.t0')
            .style('opacity', function () {
                if (recipeIdN.TaPerc < 50) { return 0.3 }
                else { return 1 }
            })
        d3.select('.recipe-row7').select('.t1')
            .style('opacity', function () {
                if (recipeIdN.TaPerc > 50) { return 0.3 }
                else { return 1 }
            })
        d3.select('.recipe-row8').select('.t0')
            .style('opacity', function () {
                if (recipeIdN.GrPerc < 50) { return 0.3 }
                else { return 1 }
            })
        d3.select('.recipe-row8').select('.t1')
            .style('opacity', function () {
                if (recipeIdN.GrPerc > 50) { return 0.3 }
                else { return 1 }
            })
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



// filtri personalizzabili
let formArrayTitles = ['Keyword', 'Topic', 'Aim', 'Evidence']
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


for (let f = 0; f < formArrayTitles.length; f++) {
    filtriCustom
        .append('form')
        .attr('id', 'divFormK' + f)
    let divFormK = d3.select('#divFormK' + f)
    divFormK
        .append('label')
        .attr('for', function () { return formArrayTitles[f] })
        .text(function () { return formArrayTitles[f] })

    divFormK
        .append('select')
        .on('change', function () {
            let card = d3.select("#all-cards").selectAll('.card')

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

            let productsSubhead2 = d3.select("#productsSubhead")
            let totResults2 = cardSelected.size()
            productsSubhead2.text(function () {
                return 'products (' + totResults2 + ')'
            })

            document.getElementById('colDx').scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

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
            // .text(formArray[formArrayTitles[f]][k])


            .text(function () {
                if (f == 3) {
                    if (formArray[formArrayTitles[f]][k] == 'TRUE') {
                        return 'statistics'
                    } else if (formArray[formArrayTitles[f]][k] == 'FALSE') {
                        return 'groundless'
                    }
                } else if (f != 3) { return formArray[formArrayTitles[f]][k] }
            })
    }
}
filtriCustom
    .append('div')
    .attr('class', 'roundTag')
    .append('p')
    .attr('id', 'resetBtn')
    .text('reset')
    .on('click', function () {
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

        let productsSubhead3 = d3.select("#productsSubhead")
        let totResults3 = card.size()
        productsSubhead3.text(function () {
            return 'products (' + totResults3 + ')'
        })

        document.getElementById('colDx').scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    })



function closedRecipes() {
    let filterDiv = d3.select("#all-filters")
    let filter = filterDiv.selectAll(".recipe");
    for (let j = 0; j < recipes.length; j++) {
        for (let i = 0; i < 4; i++) {
            filter.selectAll('.orecchio')._groups[j][i].style.display = 'block'
        }
        filter.select('.card-body').select('.card-text')._groups[0][j].style.marginTop = "-50px"
        filter._groups[0][j].style.opacity = '1'
        filter.select('.recipe-row-T0').select('.roundTag')._groups[0][j].style.backgroundColor = 'white'
        for (let n = 0; n < filter.select('.recipe-row-T1').selectAll('.roundTag')._groups[j].length; n++) {
            filter.select('.recipe-row-T1').selectAll('.roundTag')._groups[j][n].style.backgroundColor = 'white'
        }
    }
}

function openRecipe(btnId) {
    if (btnId == 0) {
        let card = d3.select("#all-cards").selectAll('.card')
        card.style('display', 'inline-flex')

        card.selectAll('div')
            .style('background-color', 'white')

        let productsSubhead = d3.select("#productsSubhead")
        let totResults = card.size()
        productsSubhead.text(function () {
            return 'products (' + totResults + ')'
        })


    } else {
        recipeClicked = btnId.srcElement.__data__.recipeId;
        for (let j = 0; j < recipes.length; j++) {
            if (j != recipeClicked) {
                if (archiveOpen == false) {
                    filter._groups[0][j].style.order = '1'
                }

                for (let i = 0; i < 4; i++) {
                    filter.selectAll('.orecchio')._groups[j][i].style.display = 'block'
                }
                filter.select('.card-body').select('.card-text')._groups[0][j].style.marginTop = "-50px"

                filter._groups[0][j].style.opacity = '0.3'
                filter.select('.recipe-row-T0').select('.roundTag')._groups[0][j].style.backgroundColor = 'white'
                for (let n = 0; n < filter.select('.recipe-row-T1').selectAll('.roundTag')._groups[j].length; n++) {
                    filter.select('.recipe-row-T1').selectAll('.roundTag')._groups[j][n].style.backgroundColor = 'white'
                }
            }
            else if (j == recipeClicked) {
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


                if (filter.select('.recipe-row-T0').select('.roundTag').select('p')._groups[0][j].innerText != '') { filter.select('.recipe-row-T0').select('.roundTag')._groups[0][j].style.backgroundColor = 'var(--primary-color)' };

                if (filter.select('.recipe-row-T1').select('.roundTag').select('p')._groups[0][j].innerText != '') {
                    for (let n = 0; n < filter.select('.recipe-row-T1').selectAll('.roundTag')._groups[j].length; n++) {
                        filter.select('.recipe-row-T1').selectAll('.roundTag')._groups[j][n].style.backgroundColor = 'var(--secondary-color)'
                    }
                };
            }
        }
    }

}




function openArchive() {
    archiveOpen = true

    d3.select('#prepDiv').style('height', 'auto').style('min-height', 350 + 'px').style('padding', 70 + 'px ' + 0 + 'px ' + 30 + 'px ' + 0 + 'px')

   d3.select('#recTextUx').text('< recipes')

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

}

function closeArchive() {
    openAllArchiveBoulean = false;
    archiveOpen = false

    if (archiveOpen == false) {
        // if (j != 0) { filter._groups[0][j].style.order = '0.5' }
        // else if (j == 0) { filter._groups[0][j].style.order = '1' }
        filter.style('order', '1')
    }
    d3.select('#recTextUx').text('recipes')

    d3.select('#openAllArchiveTitle')
        .text('Explore all')

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

    // d3.select('.card-columns').style('column-count', '3')


    d3.selectAll('#all-filters')
        .style('display', 'flex')
    d3.selectAll('#filtriCustom')
        .style('display', 'none')


    d3.selectAll('#all-filters')
        .style('opacity', '1')
    // const t = d3.timer((elapsed) => {
    //     t.stop();
    // }, 1500);

}

function openAllArchive() {
    openAllArchiveBoulean = true;
    d3.select('#openAllArchiveTitle')
        .text('Close')

    openRecipe(0)

    document.getElementById('colDx').scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    d3.select('#all-cards').style('padding-top', '70px')
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

    // d3.select('.card-columns').style('column-count', '4')

    d3.select('#prepDiv').style('height', 0 + 'px').style('min-height', 0 + 'px').style('padding', 0 + 'px ' + 0 + 'px ' + 0 + 'px ' + 0 + 'px')


    const t = d3.timer((elapsed) => {
        d3.selectAll('#all-filters')
            .style('display', 'none')

        d3.select('#filtriCustom')
            .style('display', 'flex')

        t.stop();
    }, 1500);
}







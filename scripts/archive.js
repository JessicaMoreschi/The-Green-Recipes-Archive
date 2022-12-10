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
    .on('click', function () { closeArchive(); closedRecipes() })
    .style('cursor', 'pointer')
    .append('div')
container.select('#colSx')
    .append('div')
    .attr('id', 'all-filters')
    .attr('class', 'flex-row filter')



container.append('div')
    .attr('class', 'col-md-auto')
    .attr('id', 'colDx')
    .append('div')
    .attr('class', 'flex-row head sub')
    .append('p')
    .text('products')
    .attr('id', 'productsSubhead')
container.select('#colDx').select('.sub')
    .append('p')
    .text('x')
    .on('click', function () { closeArchive(); closedRecipes() })
    .style('cursor', 'pointer')

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
        .style('text-transform', function(d){
            if (d.Typology == 'title'){return 'uppercase'}
            else if (d.Typology == 'subtitle'){return 'uppercase'}
        })
        .style('font-style', function(d){
            if ((d.Typology == 'statement')||(d.Typology == 'subtitle')){return 'italic'}
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
    var allBtns = ['Keyword', 'TagAnimal', 'TagDistribution', 'TagEnergy', 'TagFood', 'TagManagement', 'TagWaste', 'Actions', 'ToV', 'SentenceAim'];

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

            .style('opacity', function (d) {
                if (i >= 8) {
                    if ((d[allBtns[i]] == 'FALSE') || (d[allBtns[i]] == 'dissemination')) {
                        return "0.4"
                    }
                }
            })
        tag.append('img')
            .attr('src', function () {
                if (i == 0) { return 'assets/icon/keyword.svg' }
                else if (i <= 7) { return 'assets/icon/topic.svg' }
                else if (i == 8) { return 'assets/icon/data.svg' }
                else { return 'assets/icon/action.svg' }
            })
        tag.append("p")
            .text(function (d) {
                if (i == 0) {
                    return d.Keyword
                }
                else if (i <= 7) { return allBtns[i] }
                else if (i == 8) {
                    if (d[allBtns[i]] == 'TRUE') {
                        return 'data'
                    } else { return 'no data' }
                }
                else if (i == 9) { return d[allBtns[i]] }
            })
    }


})



//filter
let filterDiv = d3.select("#all-filters")
let filter = filterDiv.selectAll("div")
    .data(recipes)
    .join("div")
    .attr("class", "flex-column recipe")
filter.attr('id', function (d) { return 'recipe' + d.recipeId })
filter.style('order', function (d) { 
    if (d.recipeId==0)
    {return '1'} else {return '0'}})

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
            .attr('src', function () {
                if (i == 0) { return 'assets/icon/keyword.svg' }
                else if (i == 1) { return 'assets/icon/topic.svg' }
                else if (i == 2) { return 'assets/icon/action.svg' }
                else { return 'assets/icon/data.svg' }
            })


        tag.append("p")
            .text(function (d) {
                let recipeTopicArray = []
                if (i == 0) { return d.Keyword }
                else if (i == 1) {
                    if (d.TagAnimal == 'TRUE') { recipeTopicArray.push('TagAnimal') }
                    if (d.TagDistribution == 'TRUE') { recipeTopicArray.push('TagDistribution') }
                    if (d.TagEnergy == 'TRUE') { recipeTopicArray.push('TagEnergy') }
                    if (d.TagFood == 'TRUE') { recipeTopicArray.push('TagFood') }
                    if (d.TagManagement == 'TRUE') { recipeTopicArray.push('TagManagement') }
                    if (d.TagWaste == 'TRUE') { recipeTopicArray.push('TagWaste') }
                    if (d.Actions == 'TRUE') { recipeTopicArray.push('Actions') }

                    if (j == 0) { return recipeTopicArray[0] }
                    else { return recipeTopicArray[1] }
                }
                else if (i == 2) { return d.SentenceAim }
                else if (i == 3) { if (d.ToV == 'TRUE') { return 'Data' } else if (d.ToV == 'FALSE') { return 'no data' } }
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

        if (recipeIdN.recipeId != 0) {
            card
                .style('display', 'none')
            let cardSelected = card
                .filter(function (d) {
                    return (
                        (((d.SentenceAim == recipeIdN.SentenceAim) || (recipeIdN.SentenceAim == undefined)) &&
                            ((d.Keyword == recipeIdN.Keyword) || (recipeIdN.Keyword == undefined)) &&
                            ((d.ToV == recipeIdN.ToV) || (recipeIdN.ToV == undefined)) && (
                                (d.Actions == recipeIdN.Actions) ||
                                (d.TagAnimal == recipeIdN.TagAnimal) ||
                                (d.TagDistribution == recipeIdN.TagDistribution) ||
                                (d.TagEnergy == recipeIdN.TagEnergy) ||
                                (d.TagFood == recipeIdN.TagFood) ||
                                (d.TagManagement == recipeIdN.TagManagement) ||
                                (d.TagWaste == recipeIdN.TagWaste)))
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
                return 'products (' + totResults + ')'
            })
        }

        else if (recipeIdN.recipeId == 0) {
            card
                .style('display', 'inline-flex')
            openRecipe(btnId)
            if (archiveOpen == false) {
                openArchive()
            }

            card.selectAll('div')
                .style('background-color', 'white')

            let productsSubhead = d3.select("#productsSubhead")
            let totResults = card.size()
            productsSubhead.text(function () {
                return 'products (' + totResults + ')'
            })
        }
    });


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
        filter.select('.recipe-row-T2').select('.squareTag')._groups[0][j].style.opacity = '1'
        filter.select('.recipe-row-T3').select('.squareTag')._groups[0][j].style.opacity = '1'

    }
}

function openRecipe(btnId) {
    recipeClicked = btnId.srcElement.__data__.recipeId;
    for (let j = 0; j < recipes.length; j++) {
        if (j != recipeClicked) {
            if (archiveOpen == false) {
                if(j!= 0)
               { filter._groups[0][j].style.order = '0.5'}
               else if(j == 0)  { filter._groups[0][j].style.order = '1'}
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

            if (filter.select('.recipe-row-T2').select('.squareTag').select('p')._groups[0][j].innerText.localeCompare('dissemination', 'en', { sensitivity: 'base' }) == 0) { filter.select('.recipe-row-T2').select('.squareTag')._groups[0][j].style.opacity = '0.3' };

            if (filter.select('.recipe-row-T3').select('.squareTag').select('p')._groups[0][j].innerText.localeCompare('no data', 'en', { sensitivity: 'base' }) == 0) { filter.select('.recipe-row-T3').select('.squareTag')._groups[0][j].style.opacity = '0.3' }
        }
    }

}




function openArchive() {
    archiveOpen = true
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
}

function closeArchive() {
    archiveOpen = false
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
}








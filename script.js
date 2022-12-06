// Interpret the data as the correct format. Use d3.csv or d3.tsv accordingly.
data = d3.csv("assets/data/prov.csv");

// Select the container where we will put our HTML elements
let container = d3.select(".container");

container.append('div')
    .attr('id', 'all-filters')
    .attr('class', 'flex-row')

container.append('div')
    .attr('id', 'all-cards')
    .attr('class', 'card-columns')


let cards = d3.select("#all-cards")


// Load data
data.then(function (data) {
    // Do stuff with your data!
    // Join your data to the creation of div elements to the same number of items in your dataset.
    let card = cards.selectAll("div")
        .data(data)
        .join("div")
        .attr("class", "flex-column card")

    // We append to the initial card all the parts required.
    // HEADER
    card.append("div")
        .attr("class", "flex-column cardHeader")
        .append('img')
        .attr('src', 'assets/icon/link.svg')

    card.append("p")
        .attr("class", "flex-row card-content")
        .text(function (data) {
            return data.Context
        })

    card.append("div")
        .attr("class", "flex-row cardFooter")


        .append('div')
        .attr("class", "flex-row roundTag")
    var tagk = card.select('.roundTag', ":last-child")
        .style('background-color', "var(--primary-color)")
    tagk.append('img')
        .attr('src', 'assets/icon/keyword.svg')
    tagk.append("p")
        .text(function (d) {
            return d.Keyword
        })


    card.select(".cardFooter")
        .append('div')
        .attr("class", "flex-row roundTag T1")
    var tagT1 = card.select('.T1')
        .style('display', function (d) {
            if (d.TagAnimal != 'TRUE') {
                return 'none'
            } else { return 'flex' }
        })
    tagT1.append('img')
        .attr('src', 'assets/icon/topic.svg')
    tagT1.append("p")
        .text(function (d) {
            if (d.TagAnimal == 'TRUE') {
                return 'Animal'
            }
        })

    card.select(".cardFooter")
        .append('div')
        .attr("class", "flex-row roundTag T2")
    var tagT2 = card.select('.T2')
        .style('display', function (d) {
            if (d.TagDistribution != 'TRUE') {
                return 'none'
            } else { return 'flex' }
        })
    tagT2.append('img')
        .attr('src', 'assets/icon/topic.svg')
    tagT2.append("p")
        .text(function (d) {
            if (d.TagDistribution == 'TRUE') {
                return 'distribution'
            }
        })

    card.select(".cardFooter")
        .append('div')
        .attr("class", "flex-row roundTag T3")
    var tagT3 = card.select('.T3')
        .style('display', function (d) {
            if (d.TagEnergy != 'TRUE') {
                return 'none'
            } else { return 'flex' }
        })
    tagT3.append('img')
        .attr('src', 'assets/icon/topic.svg')
    tagT3.append("p")
        .text(function (d) {
            if (d.TagEnergy == 'TRUE') {
                return 'energy'
            }
        })

    card.select(".cardFooter")
        .append('div')
        .attr("class", "flex-row roundTag T4")
    var tagT4 = card.select('.T4')
        .style('display', function (d) {
            if (d.TagFood != 'TRUE') {
                return 'none'
            } else { return 'flex' }
        })
    tagT4.append('img')
        .attr('src', 'assets/icon/topic.svg')
    tagT4.append("p")
        .text(function (d) {
            if (d.TagFood == 'TRUE') {
                return 'food'
            }
        })

    card.select(".cardFooter")
        .append('div')
        .attr("class", "flex-row roundTag T5")
    var tagT5 = card.select('.T5')
        .style('display', function (d) {
            if (d.TagManagement != 'TRUE') {
                return 'none'
            } else { return 'flex' }
        })
    tagT5.append('img')
        .attr('src', 'assets/icon/topic.svg')
    tagT5.append("p")
        .text(function (d) {
            if (d.TagManagement == 'TRUE') {
                return 'management'
            }
        })

    card.select(".cardFooter")
        .append('div')
        .attr("class", "flex-row roundTag T6")
    var tagT6 = card.select('.T6')
        .style('display', function (d) {
            if (d.TagWaste != 'TRUE') {
                return 'none'
            } else { return 'flex' }
        })
    tagT6.append('img')
        .attr('src', 'assets/icon/topic.svg')
    tagT6.append("p")
        .text(function (d) {
            if (d.TagWaste == 'TRUE') {
                return 'waste'
            }
        })

    card.select(".cardFooter")
        .append('div')
        .attr("class", "flex-row squareTag Data")
    var tagData = card.select('.Data')
    tagData.append('img')
        .attr('src', 'assets/icon/data.svg')
    tagData.append("p")
        .text(function (d) {
            if (d.Data == 'TRUE') {
                return 'data'
            } else {
                return 'no data'
            }
        })

    card.select(".cardFooter")
        .append('div')
        .attr("class", "flex-row squareTag Act")
    var tagAct = card.select('.Act')
    tagAct.append('img')
        .attr('src', 'assets/icon/action.svg')
    tagAct.append("p")
        .text(function (d) {
            if (d.Actions == 'TRUE') {
                return 'take action'
            } else {
                return 'dissemination'
            }
        })
})

//filter
let filterDiv = d3.select("#all-filters")
let filter = filterDiv.selectAll("div")
    .data(recipes)
    .join("div")
    .attr("class", "card text-white bg-primary mb-3")
    .style("max-width", "10rem")
filter.append("div")
    .attr("class", "card-body")
    .append('p')
    .attr("class", "card-text")
    .text(function (a) {
        return JSON.stringify(a, null, 4)
    })
filter.append("div")
    .attr("class", "cardFooter")
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-light btn-sm")
    .attr("name", function (a) {
        return a.recipeId
    })
    .text(function (a) {
        return 'recipe' + a.recipeId
    })
    .on('click', function (btnId) {
        let recipe = recipes[btnId.srcElement.name];
        d3.select("#all-cards").selectAll('.card')
            .style('display', 'none')
            .filter(function (d) {
                return (
                    ((d.SentenceAim == recipe.SentenceAim) || (recipe.SentenceAim == undefined)) &&
                    ((d.Keyword == recipe.Keyword) || (recipe.Keyword == undefined)) &&
                    ((d.ToV == recipe.ToV) || (recipe.ToV == undefined)) &&
                    ((d.Actions == recipe.Actions) || (recipe.Actions == undefined)) &&
                    ((d.TagAnimal == recipe.TagAnimal) || (recipe.TagAnimal == undefined)) &&
                    ((d.TagDistribution == recipe.TagDistribution) || (recipe.TagDistribution == undefined)) &&
                    ((d.TagEnergy == recipe.TagEnergy) || (recipe.TagEnergy == undefined)) &&
                    ((d.TagFood == recipe.TagFood) || (recipe.TagFood == undefined)) &&
                    ((d.TagManagement == recipe.TagManagement) || (recipe.TagManagement == undefined)) &&
                    ((d.TagWaste == recipe.TagWaste) || (recipe.TagWaste == undefined))
                )
            })
            .style('display', 'inline-flex');
    });










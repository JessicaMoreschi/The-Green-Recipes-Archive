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
    //tags
    var allBtns = ['Keyword', 'TagAnimal', 'TagDistribution', 'TagEnergy', 'TagFood', 'TagManagement', 'TagWaste', 'Data', 'Actions'];

    for (let i = 0; i < allBtns.length; i++) {

        card.select(".cardFooter")
            .append('div')
            .attr("class", function () {
                if (i < 7) { return "flex-row roundTag " + allBtns[i] }
                else { return "flex-row squareTag " + allBtns[i] }
            })
        var tag = card.select('.' + allBtns[i])
            .style('display', function (d) {
                if (i > 0 && i <= 6) {
                    if (d[allBtns[i]] == 'FALSE') {
                        return 'none'
                    } else { return 'flex' }
                }
            })
            .style('background-color', function (d) {
                if (i == 0) {
                    if (d[allBtns[i]] == 'impact') {//recipe k.1
                        return "var(--secondary-color)"
                    } else { return "var(--primary-color)" }//recipe k.1
                }
            })
        tag.append('img')
            .attr('src', function () {
                if (i == 0) { return 'assets/icon/keyword.svg' }
                else if (i <= 6) { return 'assets/icon/topic.svg' }
                else if (i == 7) { return 'assets/icon/data.svg' }
                else { return 'assets/icon/action.svg' }
            })
        tag.append("p")
            .text(function (d) {
                if (i == 0) {
                    return d.Keyword
                }
                else if (i <= 6) { return allBtns[i] }
                else if (i == 7) {
                    if (d[allBtns[i]] == 'TRUE') {
                        return 'data'
                    } else { return 'no data' }
                }
                else if (i == 8) {
                    if (d[allBtns[i]] == 'TRUE') {
                        return 'take action'
                    } else { return 'dissemination' }
                }

            })
    }

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









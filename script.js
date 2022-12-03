// Interpret the data as the correct format. Use d3.csv or d3.tsv accordingly.
data = d3.csv("data/prov.csv");

// Select the container where we will put our HTML elements
let container = d3.select(".container");

container.append('div')
    .attr('id', 'all-filters')
    .attr('class', 'row no-gutters')
    .style('column-gap', '20px')

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
        .attr("class", "card")

    // We append to the initial card all the parts required.
    // HEADER

    card.append("div")
        .attr("class", "card-body")
        .append('p')
        .attr("class", "card-text")
        .text(function (data) {
            return data.Context
        })

    card.append("div")
        .attr("class", "card-footer")
        .append('ul')
        .attr("class", "nav nav-pills card-header-pills")
        .append('li')
        .attr("class", "nav-item")
        .append('small')
        .attr("class", "text-muted")
        .text(function (d) {
            let topic = [];
            if (d.TagAnimal == 'TRUE') {
                topic.push('>Animal')
            }
            if (d.TagDistribution == 'TRUE') {
                topic.push('>distribution')
            }
            if (d.TagEnergy == 'TRUE') {
                topic.push('>energy')
            }
            if (d.TagFood == 'TRUE') {
                topic.push('>food')
            }
            if (d.TagManagement == 'TRUE') {
                topic.push('>management')
            }
            if (d.TagWaste == 'TRUE') {
                topic.push('>waste')
            }
            if (d.ToV == 'TRUE') {
                topic.push('data')
            } else if (d.ToV == 'FALSE') {
                topic.push('noData')
            }
            if (d.Actions == 'TRUE') {
                topic.push('action')
            } else if (d.Actions == 'FALSE') {
                topic.push('noAction')
            }
            return d.SentenceAim + " " + d.Keyword + " " + topic.join(' ');

        })
})

const recipes = [
    {
        recipeId: 0,
        SentenceAim: undefined,
        Keyword: undefined,
        ToV: undefined,
        Actions: undefined,
        TagAnimal: undefined,
        TagDistribution: undefined,
        TagEnergy: undefined,
        TagFood: undefined,
        TagManagement: undefined,
        TagWaste: undefined,
    },
    {
        recipeId: 1,
        SentenceAim: 'take action',
        Keyword: 'impact',
        ToV: 'TRUE',
        Actions: 'TRUE',
        TagAnimal: undefined,
        TagDistribution: undefined,
        TagEnergy: undefined,
        TagFood: undefined,
        TagManagement: undefined,
        TagWaste: undefined,
    },
    {
        recipeId: 2,
        SentenceAim: 'dissemination',
        Keyword: 'recycle',
        ToV: 'TRUE',
        Actions: 'FALSE',
        TagAnimal: undefined,
        TagDistribution: undefined,
        TagEnergy: undefined,
        TagFood: undefined,
        TagManagement: undefined,
        TagWaste: undefined,
    },
    {
        recipeId: 3,
        SentenceAim: 'take action',
        Keyword: 'greenhouse gas',
        ToV: 'FALSE',
        Actions: 'FALSE',
        TagAnimal: undefined,
        TagDistribution: undefined,
        TagEnergy: undefined,
        TagFood: undefined,
        TagManagement: undefined,
        TagWaste: undefined,
    }
]

//filter
let filterDiv = d3.select("#all-filters")
let filter = filterDiv.selectAll("div")
    .data(recipes)
    .join("div")
    .attr("class", "card text-white bg-primary mb-3")
    .style("max-width","10rem")
filter.append("div")
    .attr("class", "card-body")
    .append('p')
    .attr("class", "card-text")
    .text(function (a) {
        return JSON.stringify(a, null, 4)})
filter.append("div")
    .attr("class", "card-footer")
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-light btn-sm")
    .attr("name", function (a) {
        return a.recipeId})
    .text(function (a) {
        return 'recipe' + a.recipeId})
    .on('click', function (btnId) {
        let recipe = recipes[btnId.srcElement.name];
        d3.select("#all-cards").selectAll('.card')
            .style('display', 'none')
            .filter(function (d) {
                return (
                    ((d.SentenceAim == recipe.SentenceAim) || (recipe.SentenceAim == undefined)) &&
                    ((d.Keyword == recipe.Keyword) || (recipe.Keyword == undefined)) &&
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










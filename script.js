// Interpret the data as the correct format. Use d3.csv or d3.tsv accordingly.
data = d3.csv("data/prov.csv");

// Select the container where we will put our HTML elements
let cards = d3.select("#all-cards");

// Load data
data.then(function(data) {
    // Do stuff with your data!
    console.log(data[0]);

    // Join your data to the creation of div elements to the same number of items in your dataset.
    let card = cards.selectAll("div")
    .data(data)
    .join("div")
    .attr("class", "card");

    // We append to the initial card all the parts required.
    // HEADER

    card.append("div")
    .attr("class", "card-body")
    .append('p')
    .attr("class", "card-text")
    .text(function(d) {
        return d.Context
    })

    card.append("div")
    .attr("class", "card-footer")
    .append('ul')
    .attr("class", "nav nav-pills card-header-pills")
    .append('li')
    .attr("class", "nav-item")
    .append('small')
    .attr("class", "text-muted")
    .text(function(d) {
        let topic=[];
        if(d.TagAnimal=='TRUE'){
            topic.push('>Animal')
        } 
        if(d.TagDistribution=='TRUE'){
            topic.push('>distribution')
        } 
        if(d.TagEnergy=='TRUE'){
            topic.push('>energy')
        } 
        if(d.TagFood=='TRUE'){
            topic.push('>food')
        } 
        if(d.TagManagement=='TRUE'){
            topic.push('>management')
        } 
        if(d.TagWaste=='TRUE'){
            topic.push('>waste')
        } 
        if(d.ToV=='TRUE'){
            topic.push('data')
        }  else if(d.ToV=='FALSE'){
            topic.push('noData')
        }
        if(d.Actions=='TRUE'){
            topic.push('action')
        }  else if(d.Actions=='FALSE'){
            topic.push('noAction')
        }
        console.log(topic)
        return d.SentenceAim+" "+d.Keyword+" "+topic.join(' ')
    })

    

    // TWEET
    // card.append("div")
    // .attr("class", "card-footer")
    // .append("p")
    // .text(function(d) {
    //     return d.body;
    // })
});

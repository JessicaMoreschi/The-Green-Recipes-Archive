
let container = d3.select(".container");

container.append('div')
    .attr('class', 'flex-column landingText')
    let landingText = container.select('.landingText')
    .append('p')
    .text('The')
    .style('font-style', 'italic')
    .append('p')
    .text('GREEN')
    .append('p')
    .text('RECIPE')
    .append('p')
    .text('archive')
    .style('font-style', 'italic')
    .append('p')
    .text('↓')
    .attr('id', 'landingArrow')


    


    
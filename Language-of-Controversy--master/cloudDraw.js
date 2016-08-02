function drawOnGrid(topWords)
{
      var fill = d3.scale.category10();

    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
    var count2 = 0;

    //Word cloud creation in D3. Credit to Jason Davies for sample code.
    d3.layout.cloud().size([300, 500])
      .words(topWords.map(function(d)
      {
        var wordSize = 20;
        wordSize = wordSize * ((topWords[count2].count)/topWords[24].count);
        count2++;
        return {text: d.word, count: d.count, size: wordSize}
      }))
      .padding(5)
      .rotate(function() { return ~~(0) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
 //Credits to Jason Davies for D3 Word cloud sample code.   
    var count = 0;
    d3.select("#svg").append("svg")
        .attr("width", 300)
        .attr("height", 500)
        .attr("class", "wordcloud")
        .append("g")
        .attr("transform", "translate(150,250)")
        .selectAll("text")
        .data(words)
        .enter().append("text")

      //change font with size
        .style("font-size", function(d) {
          var wordSize = 20;
          wordSize = wordSize * ((topWords[count].count)/topWords[24].count);
          count++;
          return wordSize + "px"; 
       })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate("+ d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .on("mouseover", function(d) {
            tooltip.transition()
               .duration(200)
               .style("opacity", .9);
            //Add Tooltip.html with transition and style
            tooltip.html("\"" + d.text + "\"" + " appears " + d.count + " times.") 
        })
        .on("mousemove", function(d) {
            return tooltip
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY + 5) + "px")
        })
        //Then Add .on("mouseout", ....
        .on("mouseout", function(d) {
            tooltip.transition().duration(500).style("opacity", 0);
        })
  }
}
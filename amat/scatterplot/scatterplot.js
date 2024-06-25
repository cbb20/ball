function scatterPlot(data) {
    const entries = Object.entries(data).map(([quarter, value]) => ({ quarter, value }));
    
    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const svg = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(entries.map(d => d.quarter))
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(entries, d => d.value)])
        .nice()
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".dot")
        .data(entries)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.quarter) + x.bandwidth() / 2)
        .attr("cy", d => y(d.value))
        .attr("r", 5);
}

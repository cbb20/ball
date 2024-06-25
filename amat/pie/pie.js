function pie(data = {'Q1': 0.2, 'Q2': 0.3, 'Q3': 0.1, 'Q4': 0.4}) {
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(d3.schemeCategory10);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const pie = d3.pie()
        .value(d => d[1]);

    const svg = d3.select(".chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = svg.selectAll(".arc")
        .data(pie(Object.entries(data)))
        .enter().append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data[0]));

    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text(d => `${d.data[0]}: ${d3.format(".0%")(d.data[1])}`);
}

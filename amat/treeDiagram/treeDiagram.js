function treeDiagram(data) {
    const root = {
        name: "Root",
        children: Object.entries(data).map(([key, value]) => ({
            name: `${key}: ${value}`
        }))
    };

    const width = 800;
    const height = 500;

    const tree = d3.tree().size([height, width - 160]);
    const rootData = d3.hierarchy(root);

    const svg = d3.select(".chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(80,0)");

    const links = tree(rootData).links();
    const linkPathGenerator = d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x);

    svg.selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', linkPathGenerator);

    const nodes = svg.selectAll('.node')
        .data(rootData.descendants())
        .enter().append('g')
        .attr('class', 'node')
        .attr("transform", d => `translate(${d.y},${d.x})`);

    nodes.append('circle')
        .attr('r', 10);

    nodes.append('text')
        .attr("dy", "0.35em")
        .attr("x", d => d.children ? -13 : 13)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);
}

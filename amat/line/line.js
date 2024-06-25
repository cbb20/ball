function line(data = {'Q1': 5, 'Q2': 6, 'Q3': 8, 'Q4': 1}) {
    const margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(Object.keys(data))
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(Object.values(data), d => d)])
        .range([height, 0]);

    const lineGenerator = d3.line()
        .x((d, i) => x(Object.keys(data)[i]) + x.bandwidth() / 2)
        .y(d => y(d));

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("path")
        .datum(Object.values(data))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", lineGenerator);
}

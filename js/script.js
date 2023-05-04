(function (global) {
  var dc = {};

  // START HERE:
  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    headerHTML();
    mainHtml();
    footerHTML();
  });

  dc.loadDashboard = function (chartId) {
    console.log(chartId);
    showLoading("#main-content");
    someHtml(chartId);
  };

  dc.loadAbout = function () {
    showLoading("#about-content");
    aboutHTML();
  };

  // DASH COMPONENT
  function someHtml(chartId) {
    $ajaxUtils.sendGetRequest(
      urls.someHtmlUrl,
      function (snippetHtml) {
        insertHtml("#main-content", snippetHtml);
      },
      false
    );

    sideconHTML();
    dashboardHTML(chartId);
  }

  function dashboardHTML(cardId) {
    console.log("cardId " + cardId);

    $ajaxUtils.sendGetRequest(
      urls.dashHtmlUrl,
      function (snippetHtml) {
        insertHtml("#dash-content", snippetHtml);
      },
      false
    );

    // menuHTML();
    chartHTML(cardId);
    chartInfoHTML(cardId);
  }

  function chartHTML(cardId) {
    card = getCardById(cardId);
    $ajaxUtils.sendGetRequest(
      urls.chartHtmlUrl,
      function (snippetHtml) {
        insertHtml("#chart-content", snippetHtml);

        // Determine which chart to load based on the cardId
        switch (card.id) {
          case "A":
            $ajaxUtils.sendGetRequest(
              urls.baseUrl + card.url,
              function (data) {
                treemapLarge(data, "#chart-container");
              },
              true
            );

            break;
          case "B":
            $ajaxUtils.sendGetRequest(
              urls.baseUrl + card.url,
              function (data) {
                areaGraphLarge(data, "#chart-container");
              },
              true
            );
            break;
          case "C":
            $ajaxUtils.sendGetRequest(
              urls.baseUrl + card.url,
              function (data) {
                barChartLarge(data, "#chart-container");
              },
              true
            );
            break;
          case "D":
            // ... and so on
            break;
          case "E":
            // ... and so on
            break;
          case "F":
            // ... and so on
            break;
          // ... and so on
        }
      },
      false
    );
  }

  function chartInfoHTML(cardId) {
    $ajaxUtils.sendGetRequest(
      urls.infoHtmlUrl,
      function (snippetHtml) {
        insertHtml("#chart-info-content", snippetHtml);
      },
      false
    );
  }

  function sideconHTML() {
    $ajaxUtils.sendGetRequest(
      urls.sideconHtmlUrl,
      function (snippetHtml) {
        insertHtml("#sidecon-content", snippetHtml);
      },
      false
    );
  }

  // COMMON COMPONENT
  function footerHTML() {
    $ajaxUtils.sendGetRequest(
      urls.footerHtmlUrl,
      function (snippetHtml) {
        insertHtml("#footer-content", snippetHtml);
      },
      false
    );
  }

  function headerHTML() {
    $ajaxUtils.sendGetRequest(
      urls.headerHtmlUrl,
      function (snippetHtml) {
        insertHtml("#header-content", snippetHtml);
      },
      false
    );
  }

  // ABOUT COMPONENT
  function aboutHTML() {
    $ajaxUtils.sendGetRequest(
      urls.aboutHtmlUrl,
      function (snippetHtml) {
        insertHtml("#about-content", snippetHtml);
      },
      false
    );
  }

  // HOME COMPONENT
  function mainHtml() {
    $ajaxUtils.sendGetRequest(
      urls.mainHtmlUrl,
      function (snippetHtml) {
        insertHtml("#main-content", snippetHtml);
      },
      false
    );

    sidebarHTML();
    homeHTML();
  }

  function homeHTML() {
    $ajaxUtils.sendGetRequest(
      urls.homeHtmlUrl,
      function (snippetHtml) {
        insertHtml("#home-content", snippetHtml);
      },
      false
    );

    size = 6;
    size = 3;
    // for (let i = 65; i < 65 + size; i++) {
    //   cardHTML(String.fromCharCode(i));
    // }

    cardHTML(homeCards.cardA);
    cardHTML(homeCards.cardB);
    cardHTML(homeCards.cardC);
  }

  function cardHTML(card) {
    // function cardHTML(cardId) {
    // card = getCardById(cardId);
    console.log(card);
    console.log(card.txt);
    console.log(card.chart);
    console.log(card.tag);
    $ajaxUtils.sendGetRequest(
      urls.cardHtmlUrl,
      function (cardHtml) {
        var cardHtml = insertProperty(cardHtml, "cardId", card.id);
        var cardHtml = insertProperty(cardHtml, "cardTxt", card.txt);
        var cardHtml = insertProperty(cardHtml, "chartId", card.chart);
        insertHtml(card.tag, cardHtml);
      },
      false
    );

    switch (card.id) {
      case "A":
        $ajaxUtils.sendGetRequest(
          urls.baseUrl + card.url,
          function (data) {
            treemapSmall(data, "#" + card.chart);
          },
          true
        );
        break;
      case "B":
        $ajaxUtils.sendGetRequest(
          urls.baseUrl + card.url,
          function (data) {
            areaGraphSmall(data, "#" + card.chart);
          },
          true
        );
        break;
      case "C":
        $ajaxUtils.sendGetRequest(
          urls.baseUrl + card.url,
          function (data) {
            barChartSmall(data, "#" + card.chart); // Call barChart() function with received data
          },
          true
        );
        break;
      case "D":
        // ... and so on
        break;
      case "E":
        // ... and so on
        break;
      case "F":
        // ... and so on
        break;
      // ... and so on
    }
  }

  function sidebarHTML() {
    $ajaxUtils.sendGetRequest(
      urls.sidebarHtmlUrl,
      function (snippetHtml) {
        insertHtml("#sidebar-content", snippetHtml);
      },
      false
    );
  }
  // END COMPONENTS

  // CHARTS
  function barChartSmall(data, tag) {
    // Extract block size data from API response
    var blockSizes = data.map(function (d) {
      return d.size;
    });

      // Define chart dimensions and margins
      var margin = { top: 10, right: 10, bottom: 10, left: 25 },
        width = 280 - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;

    // Define x and y scales
    var x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(
        data.map(function (d) {
          return d.height;
        })
      );

    var y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(blockSizes)]);

    // Define chart container and append x and y axes
    var svg = d3
      .select(tag)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(3));

    svg
      .append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y).ticks(3));

    // Append bars to chart container
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.height);
      })
      .attr("y", function (d) {
        return y(d.size);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.size);
      });
  }

  function barChartLarge(data, tag) {
    // Extract block size data from API response
    var blockSizes = data.map(function (d) {
      return d.size;
    });

      var margin = { top: 10, right: 10, bottom: 10, left: 25 },
        width = 750 - margin.left - margin.right,
        height = 820 - margin.top - margin.bottom;

    // Define x and y scales
    var x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(
        data.map(function (d) {
          return d.height;
        })
      );

    var y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(blockSizes)]);

    // Define chart container and append x and y axes
    var svg = d3
      .select(tag)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(3));

    svg
      .append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y).ticks(3));

    // Append bars to chart container
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.height);
      })
      .attr("y", function (d) {
        return y(d.size);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.size);
      });
  }

  function treemapLarge(ddata, tag) {
    console.log("in treemap");

      // Define chart dimensions and margins
      var margin = { top: 10, right: 10, bottom: 10, left: 25 },
        width = 750 - margin.left - margin.right,
        height = 620 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // read json data
    d3.json(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json"
    ).then(function (data) {
      // Give the data to this cluster layout:
      const root = d3.hierarchy(data).sum(function (d) {
        return d.value;
      }); // Here the size of each leave is given in the 'value' field in input data

      // Then d3.treemap computes the position of each element of the hierarchy
      d3
        .treemap()
        .size([width, height])
        .paddingTop(28)
        .paddingRight(7)
        .paddingInner(3)(
        // Padding between each rectangle
        //.paddingOuter(6)
        //.padding(20)
        root
      );

      // prepare a color scale
      const color = d3
        .scaleOrdinal()
        .domain(["boss1", "boss2", "boss3"])
        .range(["#df88b7", "#ffc000", "#9bca53"]);

      // And a opacity scale
      const opacity = d3.scaleLinear().domain([10, 30]).range([0.5, 1]);

      // use this information to add rectangles:
      svg
        .selectAll("rect")
        .data(root.leaves())
        .join("rect")
        .attr("x", function (d) {
          return d.x0;
        })
        .attr("y", function (d) {
          return d.y0;
        })
        .attr("width", function (d) {
          return d.x1 - d.x0;
        })
        .attr("height", function (d) {
          return d.y1 - d.y0;
        })
        .style("stroke", "black")
        .style("fill", function (d) {
          return color(d.parent.data.name);
        })
        .style("opacity", function (d) {
          return opacity(d.data.value);
        })
        .on("click", function (event, d) {
          // console.log(`Clicked on ${d}`);
          showDetail(d);
        });

      // and to add the text labels
      svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x0 + 5;
        }) // +10 to adjust position (more right)
        .attr("y", function (d) {
          return d.y0 + 20;
        }) // +20 to adjust position (lower)
        .text(function (d) {
          return d.data.name.replace("mister_", "");
        })
        .attr("font-size", "19px")
        .attr("fill", "white");

      // and to add the text labels
      svg
        .selectAll("vals")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x0 + 5;
        }) // +10 to adjust position (more right)
        .attr("y", function (d) {
          return d.y0 + 35;
        }) // +20 to adjust position (lower)
        .text(function (d) {
          return d.data.value;
        })
        .attr("font-size", "11px")
        .attr("fill", "white");

      // Add title for the 3 groups
      svg
        .selectAll("titles")
        .data(
          root.descendants().filter(function (d) {
            return d.depth == 1;
          })
        )
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x0;
        })
        .attr("y", function (d) {
          return d.y0 + 21;
        })
        .text(function (d) {
          return d.data.name;
        })
        .attr("font-size", "19px")
        .attr("fill", function (d) {
          return color(d.data.name);
        });

        // Add title for the 3 groups
        svg
          .append("text")
          .attr("x", 0)
          // .attr("y", 14) // +20 to adjust position (lower)
          // .text("Three group leaders and 14 employees")
          .attr("font-size", "19px")
          .attr("fill", "grey");
    });
  }

  function treemapSmall(ddata, tag) {
    console.log("in treemap");

      // Define chart dimensions and margins
      var margin = { top: 10, right: 10, bottom: 10, left: 25 },
        width = 250 - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // read json data
    d3.json(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json"
    ).then(function (data) {
      // Give the data to this cluster layout:
      const root = d3.hierarchy(data).sum(function (d) {
        return d.value;
      }); // Here the size of each leave is given in the 'value' field in input data

      // Then d3.treemap computes the position of each element of the hierarchy
      d3
        .treemap()
        .size([width, height])
        .paddingTop(28)
        .paddingRight(7)
        .paddingInner(3)(
        // Padding between each rectangle
        //.paddingOuter(6)
        //.padding(20)
        root
      );

      // prepare a color scale
      const color = d3
        .scaleOrdinal()
        .domain(["boss1", "boss2", "boss3"])
        .range(["#df88b7", "#ffc000", "#9bca53"]);

      // And a opacity scale
      const opacity = d3.scaleLinear().domain([10, 30]).range([0.5, 1]);

      // use this information to add rectangles:
      svg
        .selectAll("rect")
        .data(root.leaves())
        .join("rect")
        .attr("x", function (d) {
          return d.x0;
        })
        .attr("y", function (d) {
          return d.y0;
        })
        .attr("width", function (d) {
          return d.x1 - d.x0;
        })
        .attr("height", function (d) {
          return d.y1 - d.y0;
        })
        .style("stroke", "black")
        .style("fill", function (d) {
          return color(d.parent.data.name);
        })
        .style("opacity", function (d) {
          return opacity(d.data.value);
        })
        .on("click", function (event, d) {
          // console.log(`Clicked on ${d}`);
          showDetail(d);
        });

      // and to add the text labels
      svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x0 + 5;
        }) // +10 to adjust position (more right)
        .attr("y", function (d) {
          return d.y0 + 20;
        }) // +20 to adjust position (lower)
        .text(function (d) {
          return d.data.name.replace("mister_", "");
        })
        .attr("font-size", "19px")
        .attr("fill", "white");

      // and to add the text labels
      svg
        .selectAll("vals")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x0 + 5;
        }) // +10 to adjust position (more right)
        .attr("y", function (d) {
          return d.y0 + 35;
        }) // +20 to adjust position (lower)
        .text(function (d) {
          return d.data.value;
        })
        .attr("font-size", "11px")
        .attr("fill", "white");

      // Add title for the 3 groups
      svg
        .selectAll("titles")
        .data(
          root.descendants().filter(function (d) {
            return d.depth == 1;
          })
        )
        .enter()
        .append("text")
        .attr("x", function (d) {
          return d.x0;
        })
        .attr("y", function (d) {
          return d.y0 + 21;
        })
        .text(function (d) {
          return d.data.name;
        })
        .attr("font-size", "19px")
        .attr("fill", function (d) {
          return color(d.data.name);
        });
    });
  }

  function areaGraphLarge(ddata, tag) {
      // Define chart dimensions and margins
      var margin = { top: 10, right: 10, bottom: 10, left: 25 },
        width = 750 - margin.left - margin.right,
        height = 560 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Parse the Data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv"
    ).then(function (data) {
      //////////
      // GENERAL //
      //////////

      // List of groups = header of the csv files
      const keys = data.columns.slice(1);

      // color palette
      const color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet2);

      //stack the data?
      const stackedData = d3.stack().keys(keys)(data);

      //////////
      // AXIS //
      //////////

      // Add X axis
      const x = d3
        .scaleLinear()
        .domain(
          d3.extent(data, function (d) {
            return d.year;
          })
        )
        .range([0, width]);
      const xAxis = svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5));

      // Add X axis label:
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Time (year)");

      // Add Y axis label:
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", -20)
        .text("# of baby born")
        .attr("text-anchor", "start");

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 200000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y).ticks(5));

      //////////
      // BRUSHING AND CHART //
      //////////

      // Add a clipPath: everything out of this area won't be drawn.
      const clip = svg
        .append("defs")
        .append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

      // Add brushing
      const brush = d3
        .brushX() // Add the brush feature using the d3.brush function
        .extent([
          [0, 0],
          [width, height],
        ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart); // Each time the brush selection changes, trigger the 'updateChart' function

      // Create the scatter variable: where both the circles and the brush take place
      const areaChart = svg.append("g").attr("clip-path", "url(#clip)");

      // Area generator
      const area = d3
        .area()
        .x(function (d) {
          return x(d.data.year);
        })
        .y0(function (d) {
          return y(d[0]);
        })
        .y1(function (d) {
          return y(d[1]);
        });

      // Show the areas
      areaChart
        .selectAll("mylayers")
        .data(stackedData)
        .join("path")
        .attr("class", function (d) {
          return "myArea " + d.key;
        })
        .style("fill", function (d) {
          return color(d.key);
        })
        .attr("d", area);

      // Add the brushing
      areaChart.append("g").attr("class", "brush").call(brush);

      let idleTimeout;
      function idled() {
        idleTimeout = null;
      }

      // A function that update the chart for given boundaries
      function updateChart(event, d) {
        extent = event.selection;

        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if (!extent) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
          x.domain(
            d3.extent(data, function (d) {
              return d.year;
            })
          );
        } else {
          x.domain([x.invert(extent[0]), x.invert(extent[1])]);
          areaChart.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
        }

        // Update axis and area position
        xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5));
        areaChart.selectAll("path").transition().duration(1000).attr("d", area);
      }

      //////////
      // HIGHLIGHT GROUP //
      //////////

      // What to do when one group is hovered
      const highlight = function (event, d) {
        // reduce opacity of all groups
        d3.selectAll(".myArea").style("opacity", 0.1);
        // expect the one that is hovered
        d3.select("." + d).style("opacity", 1);
      };

      // And when it is not hovered anymore
      const noHighlight = function (event, d) {
        d3.selectAll(".myArea").style("opacity", 1);
      };

      //////////
      // LEGEND //
      //////////

      // Add one dot in the legend for each name.
      const size = 20;
      svg
        .selectAll("myrect")
        .data(keys)
        .join("rect")
        .attr("x", 400)
        .attr("y", function (d, i) {
          return 10 + i * (size + 5);
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function (d) {
          return color(d);
        })
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight);

      // Add one dot in the legend for each name.
      svg
        .selectAll("mylabels")
        .data(keys)
        .join("text")
        .attr("x", 400 + size * 1.2)
        .attr("y", function (d, i) {
          return 10 + i * (size + 5) + size / 2;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function (d) {
          return color(d);
        })
        .text(function (d) {
          return d;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight);
    });
  }

  function areaGraphSmall(ddata, tag) {
      // Define chart dimensions and margins
      var margin = { top: 10, right: 10, bottom: 10, left: 25 },
        width = 250 - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Parse the Data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv"
    ).then(function (data) {
      //////////
      // GENERAL //
      //////////

      // List of groups = header of the csv files
      const keys = data.columns.slice(1);

      // color palette
      const color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet2);

      //stack the data?
      const stackedData = d3.stack().keys(keys)(data);

      //////////
      // AXIS //
      //////////

      // Add X axis
      const x = d3
        .scaleLinear()
        .domain(
          d3.extent(data, function (d) {
            return d.year;
          })
        )
        .range([0, width]);
      const xAxis = svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5));

      // Add X axis label:
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Time (year)");

      // Add Y axis label:
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", -20)
        .text("# of baby born")
        .attr("text-anchor", "start");

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 200000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y).ticks(5));

      //////////
      // BRUSHING AND CHART //
      //////////

      // Add a clipPath: everything out of this area won't be drawn.
      const clip = svg
        .append("defs")
        .append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

      // Add brushing
      const brush = d3
        .brushX() // Add the brush feature using the d3.brush function
        .extent([
          [0, 0],
          [width, height],
        ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart); // Each time the brush selection changes, trigger the 'updateChart' function

      // Create the scatter variable: where both the circles and the brush take place
      const areaChart = svg.append("g").attr("clip-path", "url(#clip)");

      // Area generator
      const area = d3
        .area()
        .x(function (d) {
          return x(d.data.year);
        })
        .y0(function (d) {
          return y(d[0]);
        })
        .y1(function (d) {
          return y(d[1]);
        });

      // Show the areas
      areaChart
        .selectAll("mylayers")
        .data(stackedData)
        .join("path")
        .attr("class", function (d) {
          return "myArea " + d.key;
        })
        .style("fill", function (d) {
          return color(d.key);
        })
        .attr("d", area);

      // Add the brushing
      areaChart.append("g").attr("class", "brush").call(brush);

      let idleTimeout;
      function idled() {
        idleTimeout = null;
      }

      // A function that update the chart for given boundaries
      function updateChart(event, d) {
        extent = event.selection;

        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if (!extent) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
          x.domain(
            d3.extent(data, function (d) {
              return d.year;
            })
          );
        } else {
          x.domain([x.invert(extent[0]), x.invert(extent[1])]);
          areaChart.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
        }

        // Update axis and area position
        xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5));
        areaChart.selectAll("path").transition().duration(1000).attr("d", area);
      }

      //////////
      // HIGHLIGHT GROUP //
      //////////

      // What to do when one group is hovered
      const highlight = function (event, d) {
        // reduce opacity of all groups
        d3.selectAll(".myArea").style("opacity", 0.1);
        // expect the one that is hovered
        d3.select("." + d).style("opacity", 1);
      };

      // And when it is not hovered anymore
      const noHighlight = function (event, d) {
        d3.selectAll(".myArea").style("opacity", 1);
      };

      //////////
      // LEGEND //
      //////////

      // Add one dot in the legend for each name.
      const size = 20;
      svg
        .selectAll("myrect")
        .data(keys)
        .join("rect")
        .attr("x", 400)
        .attr("y", function (d, i) {
          return 10 + i * (size + 5);
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function (d) {
          return color(d);
        })
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight);

      // Add one dot in the legend for each name.
      svg
        .selectAll("mylabels")
        .data(keys)
        .join("text")
        .attr("x", 400 + size * 1.2)
        .attr("y", function (d, i) {
          return 10 + i * (size + 5) + size / 2;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function (d) {
          return color(d);
        })
        .text(function (d) {
          return d;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight);
    });
  }


  // CHART INTERACTIVITY
  function showDetail(d) {
    console.log(d.data);
    console.log(d.data.name);

    treemap("#info-content");
    // Use the clicked rectangle's data to display the details for that unit
    // You can use a library like Bootstrap or create your own modal to display the details

    // For example, you could display the details in a Bootstrap modal:
    // $("#myModal").modal("show");
    // $("#myModal .modal-title").text(d.data.name);
    // $("#myModal .modal-body").html("<p>Details for " + d.data.name + ":</p><ul><li>Value: " + d.data.value + "</li></ul>");
  }

  // TEST ZONE

  function bigBarChart(data, tag) {
    console.log(data);

    // Extract block size data from API response
    var blockSizes = data.map(function (d) {
      return d.size;
    });

    // Define chart dimensions and margins
    var container = document.querySelector(tag);
    var containerWidth = container.getBoundingClientRect().width;
    var containerHeight = container.getBoundingClientRect().height;

    var margin = { top: 20, right: 20, bottom: 30, left: 40 };
    var width = containerWidth - margin.left - margin.right;
    var height = containerHeight - margin.top - margin.bottom;

    // Define x and y scales
    var x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(
        data.map(function (d) {
          return d.height;
        })
      );

    var y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(blockSizes)]);

    // Define chart container and append x and y axes
    var svg = d3
      .select(tag)
      .append("svg")
      .attr(containerWidth)
      .attr(containerHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g").attr("class", "y axis").call(d3.axisLeft(y).ticks(10));

    // Append bars to chart container
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.height);
      })
      .attr("y", function (d) {
        return y(d.size);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.size);
      });
  }

  function menuHTML() {
    $ajaxUtils.sendGetRequest(
      urls.menuHtmlUrl,
      function (snippetHtml) {
        insertHtml("#menu-content", snippetHtml);
      },
      false
    );

    sidebarHTML();
    homeHTML();
  }

  // CONSTANTS TODO DB

  urls = {
    cardHtmlUrl: "snippets/card-snippet.html",
    chartHtmlUrl: "snippets/chart-snippet.html",
    infoHtmlUrl: "snippets/chart-info-snippet.html",
    dashHtmlUrl: "snippets/dash-snippet.html",
    footerHtmlUrl: "snippets/footer-snippet.html",
    headerHtmlUrl: "snippets/header-snippet.html",
    homeHtmlUrl: "snippets/home-snippet.html",
    mainHtmlUrl: "snippets/main-snippet.html",
    menuHtmlUrl: "snippets/menu-snippet.html",
    sidebarHtmlUrl: "snippets/sidebar-snippet.html",
    sideconHtmlUrl: "snippets/sidecon-snippet.html",
    aboutHtmlUrl: "snippets/about-snippet.html",
    someHtmlUrl: "snippets/some-snippet.html",
    baseUrl: "http://54.236.33.205:8000/",
    //  baseUrl : "https://api.bitcoinpublico.com/";
  };

  const homeCards = {
    cardA: {
      id: "A",
      tag: "#cardA-content",
      txt: "Treemap of fee/size",
      url: "get_blockchain_mini",
      chart: "chart-mini-A",
    },
    cardB: {
      id: "B",
      tag: "#cardB-content",
      txt: "chartB txt",
      url: "get_blockchain_mini",
      chart: "chart-mini-B",
    },
    cardC: {
      id: "C",
      tag: "#cardC-content",
      txt: "chartC txt",
      url: "get_blockchain_mini",
      chart: "chart-mini-C",
    },
    cardD: {
      id: "D",
      tag: "#cardD-content",
      txt: "chartD txt",
      url: "get_blockchain_mini",
      chart: "chart-mini-D",
    },
    cardE: {
      id: "E",
      tag: "#cardE-content",
      txt: "chartE txt",
      url: "get_blockchain_mini",
      chart: "chart-mini-E",
    },
    cardF: {
      id: "F",
      tag: "#cardF-content",
      txt: "chartF txt",
      url: "get_blockchain_mini",
      chart: "chart-mini-F",
    },
  };

  function getCardById(id) {
    for (const cardKey in homeCards) {
      const card = homeCards[cardKey];
      if (card.id === id) {
        return card;
      }
    }
    return null; // return null if no card with the given id is found
  }

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}' with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  global.$dc = dc;
})(window);

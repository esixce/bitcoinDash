(function (global) {
  var dc = {};

  // START HERE:
  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    headerHTML();
    sidebarHTML();
    menuHTML();
    mainHtml();
    footerHTML();

    var headerContent = document.getElementById("header-content");
    var sidebarContent = document.getElementById("sidebar-content");
    var menuContent = document.getElementById("menu-content");
    var mainContent = document.getElementById("main-content");

    window.addEventListener("scroll", function () {
      var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPos > headerContent.offsetHeight) {
        sidebarContent.style.position = "fixed";
        sidebarContent.style.top = "0";

        menuContent.style.position = "fixed";
        menuContent.style.top = "0";
        menuContent.style.width = sidebarContent.classList.contains("active")
          ? "calc(100% - 200px)"
          : "100%";
        menuContent.style.marginLeft = sidebarContent.classList.contains(
          "active"
        )
          ? "200px"
          : "0";

        mainContent.style.top = "0";
        mainContent.style.width = sidebarContent.classList.contains("active")
          ? "calc(100% - 200px)"
          : "100%";
        mainContent.style.marginLeft = sidebarContent.classList.contains(
          "active"
        )
          ? "200px"
          : "0";
      } else {
        sidebarContent.style.position = "absolute";
        sidebarContent.style.top = headerContent.offsetHeight + "px";

        menuContent.style.position = "absolute";
        menuContent.style.top = headerContent.offsetHeight + "px";
        menuContent.style.width = sidebarContent.classList.contains("active")
          ? "calc(100% - 200px)"
          : "100%";
        menuContent.style.marginLeft = sidebarContent.classList.contains(
          "active"
        )
          ? "200px"
          : "0";

        mainContent.style.top = headerContent.offsetHeight + "px";
        mainContent.style.width = sidebarContent.classList.contains("active")
          ? "calc(100% - 200px)"
          : "100%";
        mainContent.style.marginLeft = sidebarContent.classList.contains(
          "active"
        )
          ? "200px"
          : "0";
      }
    });

    var socialToggleBtn = document.getElementById("socialToggle");
    socialToggleBtn.addEventListener("click", function () {
      generateSocialMediaPost();
    });
  });

  dc.loadDashboard = function (cardId) {
    showLoading("#main-content");
    someHtml(cardId);
  };

  dc.loadAbout = function () {
    showLoading("#main-content");
    aboutHTML();
  };

  dc.loadSnap = function () {
    showLoading("#main-content");
    snapHTML();
  };


//FUNCTION
function generateSocialMediaPost() {

}

  // HOME COMPONENT
  function mainHtml() {
    $ajaxUtils.sendGetRequest(
      urls.mainHtmlUrl,
      function (snippetHtml) {
        insertHtml("#main-content", snippetHtml);

        homeHTML();
        overviewHTML();
      },
      false
    );
  }

  function overviewHTML() {
    $ajaxUtils.sendGetRequest(
      urls.baseUrl + "get_blockchain_info",
      function (data) {
        $ajaxUtils.sendGetRequest(
          urls.overviewHtmlUrl,
          function (overviewHtml) {
            var overviewHtml = insertProperty(
              overviewHtml,
              "chain",
              data.chain
            );
            var overviewHtml = insertProperty(
              overviewHtml,
              "blocks",
              data.blocks
            );
            var overviewHtml = insertProperty(
              overviewHtml,
              "headers",
              data.headers
            );
            var overviewHtml = insertProperty(
              overviewHtml,
              "bestblockhash",
              data.bestblockhash
            );
            var overviewHtml = insertProperty(
              overviewHtml,
              "difficulty",
              data.difficulty
            );
            var overviewHtml = insertProperty(
              overviewHtml,
              "mediantime",
              data.mediantime
            );

            insertHtml("#overview-content", overviewHtml);
          },
          false
        );
      },
      true
    );
  }

  function homeHTML() {
    $ajaxUtils.sendGetRequest(
      urls.homeHtmlUrl,
      function (snippetHtml) {
        insertHtml("#home-content", snippetHtml);

        cardHTML(homeCards.cardA);
        cardHTML(homeCards.cardB);
        cardHTML(homeCards.cardC);
      },
      false
    );

    size = 6;
    size = 3;
    // for (let i = 65; i < 65 + size; i++) {
    //   cardHTML(String.fromCharCode(i));
    // }
  }

  function cardHTML(card) {
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
            cart["get_blockchain_mini"] = data;
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
            barChartSmall(data, "#" + card.chart);
          },
          true
        );
        break;
      case "D":
        $ajaxUtils.sendGetRequest(
          urls.baseUrl + card.url,
          function (data) {
            treemapSmallD(data, "#" + card.chart);
          },
          true
        );
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

  function menuHTML() {
    $ajaxUtils.sendGetRequest(
      urls.menuHtmlUrl,
      function (snippetHtml) {
        insertHtml("#menu-content", snippetHtml);

        var sidebarToggleBtn = document.getElementById("sidebarToggle");
        var sidebarContent = document.getElementById("sidebar-content");
        var menuContent = document.getElementById("menu-content");
        var mainContent = document.getElementById("main-content");

        sidebarToggleBtn.addEventListener("click", function () {
          sidebarContent.classList.toggle("active");
          menuContent.style.marginLeft = sidebarContent.classList.contains(
            "active"
          )
            ? "200px"
            : "0";
          menuContent.style.width = sidebarContent.classList.contains("active")
            ? "calc(100% - 200px)"
            : "100%";
          mainContent.style.marginLeft = sidebarContent.classList.contains(
            "active"
          )
            ? "200px"
            : "auto";
          mainContent.style.width = sidebarContent.classList.contains("active")
            ? "calc(100% - 200px)"
            : "100%";
        });
      },
      false
    );
  }

  // DASH COMPONENT
  function someHtml(cardId) {
    $ajaxUtils.sendGetRequest(
      urls.someHtmlUrl,
      function (snippetHtml) {
        insertHtml("#main-content", snippetHtml);

        sideconHTML();
        dashboardHTML(cardId);
      },
      false
    );
  }

  function dashboardHTML(cardId) {
    $ajaxUtils.sendGetRequest(
      urls.dashHtmlUrl,
      function (snippetHtml) {
        insertHtml("#dash-content", snippetHtml);

        // menuHTML();
        chartHTML(cardId);
        chartInfoHTML(cardId);
      },
      false
    );
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

  // OTHER COMPONENTS
  function aboutHTML() {
    $ajaxUtils.sendGetRequest(
      urls.aboutHtmlUrl,
      function (snippetHtml) {
        insertHtml("#main-content", snippetHtml);
      },
      false
    );
  }
  function snapHTML() {
    $ajaxUtils.sendGetRequest(
      urls.snapHtmlUrl,
      function (snippetHtml) {
        insertHtml("#main-content", snippetHtml);
      },
      false
    );
  }

  // END COMPONENTS

  // CHART INTERACTIVITY
  function showDetail(d) {
    showLoading("#dash-content");

    $ajaxUtils.sendGetRequest(
      urls.txsmapHtmlUrl,
      function (snippetHtml) {
        insertHtml("#dash-content", snippetHtml);

        $ajaxUtils.sendGetRequest(
          urls.chartHtmlUrl,
          function (snippetHtml) {
            insertHtml("#txs-content", snippetHtml);
          },
          false
        );

        $ajaxUtils.sendGetRequest(
          urls.smallchartHtmlUrl,
          function (snippetHtml) {
            insertHtml("#block-content", snippetHtml);
          },
          false
        );

        // treemapSmall(cart.get_blockchain_mini, "#small-chart-container");

        $ajaxUtils.sendGetRequest(
          urls.baseUrl + "get_blockchain_mini",
          function (data) {
            treemapSmall(data, "#small-chart-container");
          },
          true
        );

        console.log(d);
        console.log(d.height);
        $ajaxUtils.sendGetRequest(
          urls.baseUrl + "get_txs_mini/?height=" + 3000,
          // urls.baseUrl + "get_txs_mini?height=" + d.height,
          function (data) {
            console.log(data);
            treemapLargeTxs(data, "#chart-container");
          },
          true
        );
      },
      false
    );

    chartInfoHTML();
  }

  // CHARTS
  // area graph: "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv"
  // treemap: "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json"
  // bar chart: "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv"

  function barChartSmall(ddata, tag) {
    // Define chart dimensions and margins
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 280 - margin.left - margin.right,
      height = 220 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv"
    ).then(function (data) {
      // List of subgroups = header of the csv files = soil condition here
      const subgroups = data.columns.slice(1);

      // List of groups = species here = value of the first column called group -> I show them on the X axis
      const groups = data.map((d) => d.group);

      // Add X axis
      const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // color palette = one color per subgroup
      const color = d3
        .scaleOrdinal()
        .domain(subgroups)
        .range(["#df88b7", "#ffc000", "#9bca53"]);

      //stack the data? --> stack per subgroup
      const stackedData = d3.stack().keys(subgroups)(data);

      // Show the bars
      svg
        .append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .join("g")
        .attr("fill", (d) => color(d.key))
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data((d) => d)
        .join("rect")
        .attr("x", (d) => x(d.data.group))
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth());
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
      .call(d3.axisBottom(x).ticks(0));

    svg.append("g").attr("class", "y axis").call(d3.axisLeft(y).ticks(0));

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

  function treemapLargeGroups(data, tag) {
    // Define chart dimensions and margins
    var margin = { top: 10, right: 10, bottom: 10, left: 25 },
      width = 600 - margin.left - margin.right,
      // d3.select(".chart-content").node().offsetWidth - margin.left - margin.right,
      // width = 750 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // read json data
    // Give the data to this cluster layout:
    const root = d3.hierarchy(data).sum(function (d) {
      return d.value;
    }); // Here the size of each leave is given in the 'value' field in input data

    // Then d3.treemap computes the position of each element of the hierarchy
    d3
      .treemap()
      .size([width, height])
      .paddingTop(0)
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

    // create a tooltip
    var Tooltip = d3
      .select(tag)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip.style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    };
    var mousemove = function (d) {
      Tooltip.html("The exact value of<br>this cell is: " + d.value)
        .style("left", d3.mouse(this)[0] + 70 + "px")
        .style("top", d3.mouse(this)[1] + "px");
    };
    var mouseleave = function (d) {
      Tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    };

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
        return d.y0 + 210;
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
  }

  function treemapLargeTxs(data, tag) {
    //   "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv"
    data.unshift({
      name: "Origin",
      parent: "",
      size: "",
      value: "",
    });
    data["columns"] = ["name", "parent", "size", "value"];

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const tooltip = d3
      .select(tag)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("background-color", "#f1f1f1") // Change the background color here
      .style("border", "solid")
      .style("border-color", "#0b2447") // Change the border color here
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // stratify the data: reformatting for d3.js
    const root = d3
      .stratify()
      .id(function (d) {
        return d.name;
      }) // Name of the entity (column name is name in csv)
      .parentId(function (d) {
        return d.parent;
      })(
      // Name of the parent (column name is parent in csv)
      data
    );
    root.sum(function (d) {
      return +d.size;
    }); // Compute the numeric value for each entity

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    d3.treemap().size([width, height]).padding(4)(root);

    // Define the minimum and maximum values for opacity calculation
    const minValue = d3.min(root.leaves(), (d) => +d.data.value);
    const maxValue = d3.max(root.leaves(), (d) => +d.data.value);

    const opacityScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([0.5, 1]);

    svg
      .selectAll("rect")
      .data(root.leaves())
      .join("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("stroke", "#0b2447")
      .style("stroke-width", "1px")
      .style("fill", "#576cbc")
      .style("opacity", (d) => opacityScale(d.data.value))
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            "Tx: " +
              d.data.name +
              "<br/>Fee: " +
              d.data.value +
              " sats<br/>Size: " +
              d.data.size +
              " bytes"
          )
          .style("left", event.pageX - 90 + "px")
          .style("top", event.pageY - 90 + "px");
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX - 90 + "px")
          .style("top", event.pageY - 90 + "px");
      })
      .on("mouseleave", () => {
        tooltip.style("opacity", 0);
      })
      .on("click", function (event, d) {
        showDetail(d);
      });
  }

  function treemapLarge(data, tag) {
    //   "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv"
    data.unshift({
      name: "Origin",
      parent: "",
      size: "",
      value: "",
    });
    data["columns"] = ["name", "parent", "size", "value"];

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const tooltip = d3
      .select(tag)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("background-color", "#f1f1f1") // Change the background color here
      .style("border", "solid")
      .style("border-color", "#0b2447") // Change the border color here
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // stratify the data: reformatting for d3.js
    const root = d3
      .stratify()
      .id(function (d) {
        return d.name;
      }) // Name of the entity (column name is name in csv)
      .parentId(function (d) {
        return d.parent;
      })(
      // Name of the parent (column name is parent in csv)
      data
    );
    root.sum(function (d) {
      return +d.size;
    }); // Compute the numeric value for each entity

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    d3.treemap().size([width, height]).padding(4)(root);

    // Define the minimum and maximum values for opacity calculation
    const minValue = d3.min(root.leaves(), (d) => +d.data.value);
    const maxValue = d3.max(root.leaves(), (d) => +d.data.value);

    const opacityScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([0.5, 1]);

    svg
      .selectAll("rect")
      .data(root.leaves())
      .join("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("stroke", "#0b2447")
      .style("stroke-width", "1px")
      .style("fill", "#576cbc")
      .style("opacity", (d) => opacityScale(d.data.value))
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            "Block: " +
              d.data.name +
              "<br/>Fee: " +
              d.data.value +
              " sats<br/>Size: " +
              d.data.size +
              " bytes"
          )
          .style("left", event.pageX - 90 + "px")
          .style("top", event.pageY - 90 + "px");
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX - 90 + "px")
          .style("top", event.pageY - 90 + "px");
      })
      .on("mouseleave", () => {
        tooltip.style("opacity", 0);
      })
      .on("click", function (event, d) {
        showDetail(d);
      });

    // and to add the text labels
    svg
      .selectAll("text")
      .data(root.leaves())
      .join("text")
      .attr("x", function (d) {
        return d.x0 + 10;
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return d.y0 + 12;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return d.data.name;
      })
      .attr("font-size", "15px")
      .attr("fill", "#E9F5FA");
  }

  // function treemapS(data, tag) {
  //   data.unshift({
  //     name: "Origin",
  //     parent: "",
  //     size: "",
  //     value: "",
  //   });
  //   data["columns"] = ["name", "parent", "size", "value"];

  //   // set the dimensions and margins of the graph
  //   var margin = { top: 10, right: 10, bottom: 10, left: 10 },
  //     width = 270 - margin.left - margin.right,
  //     height = 220 - margin.top - margin.bottom;

  //   // append the svg object to the body of the page
  //   const svg = d3
  //     .select(tag)
  //     .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //   // stratify the data: reformatting for d3.js
  //   const root = d3
  //     .stratify()
  //     .id(function (d) {
  //       return d.name;
  //     })
  //     .parentId(function (d) {
  //       return d.parent;
  //     })(data);

  //   root.sum(function (d) {
  //     return +d.size;
  //   });

  //   // Then d3.treemap computes the position of each element of the hierarchy
  //   // The coordinates are added to the root object above
  //   d3.treemap().size([width, height]).padding(4)(root);

  //   // Define the minimum and maximum values for opacity calculation
  //   const minValue = d3.min(root.leaves(), (d) => +d.data.value);
  //   const maxValue = d3.max(root.leaves(), (d) => +d.data.value);

  //   const opacityScale = d3
  //     .scaleLinear()
  //     .domain([minValue, maxValue])
  //     .range([0.5, 1]);

  //   svg
  //     .selectAll("rect")
  //     .data(root.leaves())
  //     .join("rect")
  //     .attr("x", (d) => d.x0)
  //     .attr("y", (d) => d.y0)
  //     .attr("width", (d) => d.x1 - d.x0)
  //     .attr("height", (d) => d.y1 - d.y0)
  //     .style("fill", "#576cbc")
  //     .style("opacity", (d) => opacityScale(d.data.value));
  // }

  function treemapSmall(data, tag) {
    data.unshift({
      name: "Origin",
      parent: "",
      size: "",
      value: "",
    });
    data["columns"] = ["name", "parent", "size", "value"];

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 270 - margin.left - margin.right,
      height = 220 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // stratify the data: reformatting for d3.js
    const root = d3
      .stratify()
      .id(function (d) {
        return d.name;
      })
      .parentId(function (d) {
        return d.parent;
      })(data);

    root.sum(function (d) {
      return +d.size;
    });

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    d3.treemap().size([width, height]).padding(4)(root);

    // Define the minimum and maximum values for opacity calculation
    const minValue = d3.min(root.leaves(), (d) => +d.data.value);
    const maxValue = d3.max(root.leaves(), (d) => +d.data.value);

    const opacityScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([0.5, 1]);

    svg
      .selectAll("rect")
      .data(root.leaves())
      .join("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("fill", "#576cbc")
      .style("opacity", (d) => opacityScale(d.data.value))
      .on("click", function (event, d) {
        showDetail(d);
      });
  }

  function treemapSmallD(ddata, tag) {
    // Define chart dimensions and margins
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 280 - margin.left - margin.right,
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
        .paddingTop(0)
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
        .style("stroke", "#576CBC")
        .style("stroke-width", "1px")
        .style("fill", function (d) {
          return color(d.parent.data.name);
        })
        .style("opacity", function (d) {
          return opacity(d.data.value);
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
            return d.height;
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
        .text("Height (height)");

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
          return x(d.data.height);
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
              return d.height;
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

  function areaGraphSmall(dataBody, tag) {
    columns = dataBody.columns;
    data = dataBody.data;
    // console.log(data);
    // Define chart dimensions and margins
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 280 - margin.left - margin.right,
      height = 220 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(tag)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //////////
    // GENERAL //
    //////////

    // List of groups = header of the csv files
    const keys = columns.slice(1);
    // console.log(keys);

    // color palette
    const color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet2);
    // console.log(color);

    //stack the data?
    const stackedData = d3.stack().keys(keys)(data);
    // console.log(stackedData);

    //////////
    // AXIS //
    //////////

    // Add X axis
    const x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return d.height;
        })
      )
      .range([0, width]);
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(0));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 200000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y).ticks(0));

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
        return x(d.data.height);
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
        // console.log("d " + d);
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
            return d.height;
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

    ////////////
    // LEGEND //
    ////////////

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
  }

  // TEST ZONE

  function bigBarChart(data, tag) {
    // console.log(data);

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

  // CONSTANTS TODO DB
  cart = {};

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
    snapHtmlUrl: "snippets/snap-snippet.html",
    aboutHtmlUrl: "snippets/about-snippet.html",
    someHtmlUrl: "snippets/some-snippet.html",
    txsmapHtmlUrl: "snippets/txsmap-snippet.html",
    smallchartHtmlUrl: "snippets/small-chart-snippet.html",
    overviewHtmlUrl: "snippets/overview-snippet.html",
    // baseUrl: "http://54.236.33.205:8000/"
    baseUrl: "http://localhost:8000/",
    // baseUrl: "https://api.bitcoinpublico.com/",
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
      txt: "Volume transacted",
      url: "get_vol_block",
      chart: "chart-mini-B",
    },
    cardC: {
      id: "C",
      tag: "#cardC-content",
      txt: "bar chart",
      url: "get_blockchain_mini",
      chart: "chart-mini-C",
    },
    cardD: {
      id: "D",
      tag: "#cardD-content",
      txt: "get fee size block",
      url: "get_fee_size_block",
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

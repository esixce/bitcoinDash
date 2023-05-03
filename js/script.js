(function (global) {
  var dc = {};

  var cardHtmlUrl = "snippets/card-snippet.html";
  var chartHtmlUrl = "snippets/chart-snippet.html";
  var footerHtmlUrl = "snippets/footer-snippet.html";
  var headerHtmlUrl = "snippets/header-snippet.html";
  var homeHtmlUrl = "snippets/home-snippet.html";
  var mainHtmlUrl = "snippets/main-snippet.html";
  var menuHtmlUrl = "snippets/menu-snippet.html";
  var sidebarHtmlUrl = "snippets/sidebar-snippet.html";
  var sideconHtmlUrl = "snippets/sidecon-snippet.html";
  var aboutHtmlUrl = "snippets/about-snippet.html";
  var baseUrl = "https://api.bitcoinpublico.com/";

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

  dc.loadDashboard = function () {
    showLoading("#main-content");
    dashboardHTML();
  };

  function loadDashboard(event, cardId) {
    event.preventDefault();   // Prevent the default link behavior
  
    // Determine which chart to load based on the cardId
    switch (cardId) {
      case "#cardA-content":
        // Load chart A
        break;
      case "#cardB-content":
        // Load chart B
        break;
      // ... and so on
    }
  }

  dc.loadAbout = function () {
    showLoading("#about-content");
    aboutHTML();
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    headerHTML();
    sidebarHTML();
    homeHTML();
    footerHTML();
  });

  // alphabetical
  function cardHTML(card) {

    $ajaxUtils.sendGetRequest(
      cardHtmlUrl,
      function (cardHtml) {
        var cardHtml = insertProperty(cardHtml, "cardTxt", card.txt);
        var cardHtml = insertProperty(cardHtml, "chartId", card.chart);
        insertHtml(card.tag, cardHtml);
      },
      false
    );

    $ajaxUtils.sendGetRequest(
      baseUrl + card.url,
      function (data) {
        // console.log(data); // Check if data is received correctly
        barChart(data, '#' + card.chart); // Call barChart() function with received data  
      },
      true
    );
  }
  
  function chartHTML() {
    $ajaxUtils.sendGetRequest(
      chartHtmlUrl,
      function (snippetHtml) {
        insertHtml("#home-content", snippetHtml);
      },
      false
    );

    $ajaxUtils.sendGetRequest(
      baseUrl, "get_blockchain_mini",
      function (data) {
        console.log(data); // Check if data is received correctly
        barChart(data); // Call testChart() function with received data    testChart();
      },
      true
    );
  }
  
  function dashboardHTML() {
    $ajaxUtils.sendGetRequest(
      mainHtmlUrl,
      function (snippetHtml) {
        insertHtml("#main-content", snippetHtml);
      },
      false
    );

    sideconHTML();
    // menuHTML();
    chartHTML();
  }

  function footerHTML() {
    $ajaxUtils.sendGetRequest(
      footerHtmlUrl,
      function (snippetHtml) {
        insertHtml("#footer-content", snippetHtml);
      },
      false
    );
  }

  function headerHTML() {
    $ajaxUtils.sendGetRequest(
      headerHtmlUrl,
      function (snippetHtml) {
        insertHtml("#header-content", snippetHtml);
      },
      false
    );
  }

  function homeHTML() {
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (snippetHtml) {
        insertHtml("#main-content", snippetHtml);
      },
      false
    );

    cardA = { id: "A", tag: "#cardA-content", txt: "chartA txt", url: 'get_blockchain_mini', chart:'chart-mini-A' };
    cardB = { id: "B", tag: "#cardB-content", txt: "chartB txt", url: 'get_blockchain_mini', chart:'chart-mini-B' };
    cardC = { id: "C", tag: "#cardC-content", txt: "chartC txt", url: 'get_blockchain_mini', chart:'chart-mini-C' };
    cardD = { id: "D", tag: "#cardD-content", txt: "chartD txt", url: 'get_blockchain_mini', chart:'chart-mini-D' };
    cardE = { id: "E", tag: "#cardE-content", txt: "chartE txt", url: 'get_blockchain_mini', chart:'chart-mini-E' };
    cardF = { id: "F", tag: "#cardF-content", txt: "chartF txt", url: 'get_blockchain_mini', chart:'chart-mini-F' };

    cardHTML(cardA);
    cardHTML(cardB);
    cardHTML(cardC);
    cardHTML(cardD);
    cardHTML(cardE);
    cardHTML(cardF);
  }

  function menuHTML() {
    $ajaxUtils.sendGetRequest(
      menuHtmlUrl,
      function (snippetHtml) {
        insertHtml("#menu-content", snippetHtml);
      },
      false
    );

    sidebarHTML();
    homeHTML();
  }

  function sidebarHTML() {
    $ajaxUtils.sendGetRequest(
      sidebarHtmlUrl,
      function (snippetHtml) {
        insertHtml("#sidebar-content", snippetHtml);
      },
      false
    );
  }

  function sideconHTML() {
    $ajaxUtils.sendGetRequest(
      sideconHtmlUrl,
      function (snippetHtml) {
        insertHtml("#sidebar-content", snippetHtml);
      },
      false
    );
  }

  function aboutHTML() {
    $ajaxUtils.sendGetRequest(
      aboutHtmlUrl,
      function (snippetHtml) {
        insertHtml("#about-content", snippetHtml);
      },
      false
    );
  }

  // CHARTS
  function barChart(data, tag) {
    console.log(data)

    // Extract block size data from API response
    var blockSizes = data.map(function (d) {
      return d.size;
    });

    // Define chart dimensions and margins
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

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

  global.$dc = dc;
})(window);

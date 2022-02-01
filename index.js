const { Provider, connect } = ReactRedux;
const { createStore, combineReducers, applyMiddleware } = Redux;

//colors for backgrounds
const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#3D9B79",
  "#479149",
  "#12191b",
  "#353637",
  "#73A857",
];

//we initialize the quotes in case teh fetch fails

let quotes = [
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn. ",
    author: "Benjamin Franklin",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    author: "Steve Jobs",
  },
  {
    text: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Always remember that you are absolutely unique. Just like everyone else. ",
    author: "Margaret Mead",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "Never let the fear of striking out keep you from playing the game. ",
    author: "Babe Ruth",
  },
  {
    text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison",
  },
  {
    text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. ",
    author: "Dr. Seuss",
  },
];
let totalQuotes;
//We fetch fot the quotes json
fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => {
    totalQuotes = quotes = data;
  });

//Redux to dos
//We add the const strings for actions
const INDEX = "INDEX";

//Create the actions keeping in mind variable amount of data

const changeQuote = (payload) => {
  return {
    type: INDEX,

    payload: Math.floor(Math.random() * quotes.length),
  };
};

//Create the reducer

const quoteReducer = (state = [0], action) => {
  switch (action.type) {
    case INDEX:
      if (quotes.length == 1) return [...state, action.payload];
      if ([...state].slice(-1)[0] === action.payload) {
        if (action.payload === quotes.length - 1) {
          action.payload -= 1;
        } else {
          action.payload += 1;
        }
      }

      return [...state, action.payload];

    default:
      return state;
  }
};

//Create the store with the reducer

const store = createStore(quoteReducer);

// React:
//Create the class thats gonna show up
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    //bind the buttons
    this.newQuote = this.newQuote.bind(this);
    this.changeQuotes = this.changeQuotes.bind(this);
  }

  //Function to filter the quotes it gets an input that is used to generate a regex pattern for matching with the text and author
  changeQuotes(words) {
    if (quotes == undefined || totalQuotes == undefined) return;

    quotes = totalQuotes;

    for (let i = 0; i < words.length; i++) {
      let regex = new RegExp("(^|\\s)" + words[i] + "($|\\s)");

      quotes = quotes.filter((quote) => {
        let value = null;
        value = quote.text.toLowerCase().match(regex);
        if (quote.author !== null && value == null) {
          value = quote.author.toLowerCase().match(regex);
        }
        return value;
      });
    }

    if (quotes.length == 0) {
      quotes.push({
        text: "There are no matching quotes",
        author: "",
      });
    }

    document.getElementById("quotesLengthIndicator").style.display = "block";
    this.props.newQuote();
  }

  //Function to modify content and call dispatch
  newQuote() {
    this.props.newQuote();

    let newColor = Math.floor(Math.random() * colors.length);

    if (
      colors[newColor] ===
      getComputedStyle(document.documentElement).getPropertyValue("--color")
    ) {
      newColor += 1;
    }

    document.documentElement.style.setProperty("--color", colors[newColor]);
    document.getElementById("quotesLengthIndicator").style.display = "block";
  }
  render() {
    return (
      <div id="quote-box" className="q">
        <Text quoteText={quotes[this.props.indx.slice(-1)[0]].text} />
        <Author authorText={quotes[this.props.indx.slice(-1)[0]].author} />
        <Buttons
          quoteText={quotes[this.props.indx.slice(-1)[0]].text}
          authorText={quotes[this.props.indx.slice(-1)[0]].author}
          newQuote={this.newQuote}
          currentIndex={this.props.indx.slice(-1)[0] + 1}
        />
        <Footer />
        <FilterSearchBar changeQuotesButton={this.changeQuotes} />
      </div>
    );
  }
}

const Text = (props) => {
  return (
    <p id="text" className="fade">
      {props.quoteText}
    </p>
  );
};

const Author = (props) => {
  return (
    <p id="author" className="fade">
      <i>{props.authorText}</i>
    </p>
  );
};

const Buttons = (props) => {
  return (
    <div id="buttonsContainer" className="buttons">
      <a
        id="tweet-quote"
        target="_top"
        title="Tweet it!"
        href={
          "https://twitter.com/intent/tweet?text=" +
          props.quoteText +
          " " +
          props.authorText +
          ". For more quotes: https://carloscr18.github.io/randomQuotes/"
        }
      >
        <i className="fa fa-twitter fa-3x"></i>
      </a>
      <p id="quotesLengthIndicator">
        {props.currentIndex + "/" + quotes.length}
      </p>
      <button id="new-quote" onClick={props.newQuote}>
        New Quote
      </button>
    </div>
  );
};

const FilterSearchBar = (props) => {
  const [value, setValue] = React.useState("");
  const [filters, setFilterValue] = React.useState([]);

  React.useEffect(() => {
    props.changeQuotesButton(filters);
  }, [filters]);

  const setInputValue = () => {
    if (value === "") return;
    setFilterValue([...filters, value.toLocaleLowerCase()]);
    document.getElementById("input-filter").value = "";
    setValue("");
  };

  const removeFilter = (filterName) => {
    setFilterValue(
      filters.filter((filtertoerase) => filtertoerase !== filterName)
    );
  };

  return (
    <div className="filterSearch">
      <button
        className="btn btn-filter"
        onClick={() => {
          setInputValue();
        }}
      >
        🔍 Filter
      </button>
      <input
        className="input-filter"
        id="input-filter"
        placeholder="Exact word filter"
        type="text"
        onChange={(event) => setValue(event.target.value)}
      ></input>
      <div className="filter-card-container">
        {filters.map((filter) => {
          return (
            <div className="filter-card">
              <p>{filter}</p>
              <button
                className="filter-card-btn"
                onClick={() => removeFilter(filter)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      By{" "}
      <a
        href="https://carloscr18.github.io/Portfolio/"
        target="_blank"
        className="textUnder"
      >
        Carlos Crespo
      </a>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { indx: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newQuote: () => {
      dispatch(changeQuote());
    },
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("app"));

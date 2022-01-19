const { Provider, connect } = ReactRedux;
const { createStore, combineReducers, applyMiddleware } = Redux;

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

//We fetch fot the quotes json
fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => {
    console.log(data, "data");
    quotes = data;
  });

//console.log(quotesArray, "QuotesArray");
//console.log(quotes, "quotes");

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
      if ([...state].slice(-1)[0] === action.payload) {
        if (action.payload === quotes.length) {
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
  }

  //Function to modify content and call dispatch
  newQuote() {
    console.log(quotes);
    this.props.newQuote();

    let newColor = Math.floor(Math.random() * colors.length);

    if (
      colors[newColor] ===
      getComputedStyle(document.documentElement).getPropertyValue("--color")
    ) {
      newColor += 1;
    }

    document.documentElement.style.setProperty("--color", colors[newColor]);
  }
  render() {
    console.log(this.props.indx);
    return (
      <div id="quote-box" className="q">
        <Text quoteText={quotes[this.props.indx.slice(-1)[0]].text} />
        <Author authorText={quotes[this.props.indx.slice(-1)[0]].author} />
        <Buttons
          quoteText={quotes[this.props.indx.slice(-1)[0]].text}
          authorText={quotes[this.props.indx.slice(-1)[0]].author}
          newQuote={this.newQuote}
        />
        <Footer />
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
      <button id="new-quote" onClick={props.newQuote}>
        New Quote
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      By{" "}
      <a href="https://carloscr18.github.io/Portfolio/" className="textUnder">
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

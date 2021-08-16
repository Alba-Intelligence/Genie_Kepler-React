//
// FROM: https://codesandbox.io/s/bv0vb
// with adaptation
//
import React from "react"
import { Provider, useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { taskMiddleware } from "react-palm/tasks"

import KeplerGl from "kepler.gl"
import { addDataToMap } from "kepler.gl/actions"
import keplerGlReducer from "kepler.gl/reducers"

import useSwr from "swr"

const store = configureStore({
  reducer: {
    keplerGl: keplerGlReducer,
  },
  middleware: [taskMiddleware],
})

function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  )
}

function Map() {
  const dispatch = useDispatch()
  const { data } = useSwr("genie_data_heatmap", async () => {
    const response = await fetch(
      "http://" +
        process.env.GENIE_SERVER_ADDRESS +
        ":" +
        process.env.GENIE_SERVER_PORT +
        "/api/data"
    );
    const data = await response.json();
    return data;
  });

  React.useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "genie_data_heatmap",
              id: "genie_data_heatmap",
            },
            data,
          },
          option: {
            centerMap: true,
            readOnly: false,
          },
          config: {},
        })
      );
    }
  }, [dispatch, data])

  return (
    <KeplerGl
      id="genie_data_heatmap"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}

export default App


// // FROM: https://github.com/jjforsythe/kepler.gl-demo/blob/master/web/src/App.js
// //
// // To be translated into tsx later...

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

// import KeplerGl from "kepler.gl";
// import { addDataToMap } from "kepler.gl/actions";

// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// class App extends Component {
//   componentDidMount() {
//     fetch(
//       "http://" +
//         process.env.GENIE_SERVER_ADDRESS +
//         ":" +
//         process.env.GENIE_SERVER_PORT +
//         "/api/data"
//     )
//       .then((response) => response.json())
//       .then((data) => this.props.dispatch(addDataToMap(data)));

//     // Load empty object to avoid UI pop-up while async API call is made
//     this.props.dispatch(addDataToMap({}));
//   }

//   render() {
//     return (
//       <div style={{ position: "absolute", width: "100vw", height: "100vh" }}>
//         <AutoSizer>
//           {({ height, width }) => (
//             <KeplerGl
//               mapboxApiAccessToken={MAPBOX_TOKEN}
//               id="map"
//               width={width}
//               height={height}
//             />
//           )}
//         </AutoSizer>
//       </div>
//     );
//   }
// }

// // export default App;

// const mapStateToProps = (state) => state;
// const dispatchToProps = (dispatch) => ({ dispatch });

// export default connect(mapStateToProps, dispatchToProps)(App);

import { Component } from 'react';
import './App.css';

interface ICubeParams {
  id: number;
  width: number;
  height: number;
  color: string;
}

interface ICube {
  parameters: ICubeParams;
}

interface IModel {
  cubes: ICube[];
  cubeCreating: ICubeParams;
  seeDocumentation: boolean;
}

class App extends Component<{}, IModel> {
  constructor(props: {}) {
    super(props);

    this.state = {
      cubes: [
        {
          parameters: {
            id: 2,
            width: 200,
            height: 200,
            color: 'red',
          },
        },
        {
          parameters: {
            id: 3,
            width: 200,
            height: 200,
            color: 'red',
          },
        },
      ],
      cubeCreating: {
        id: 4,
        width: 0,
        height: 0,
        color: 'red',
      },
      seeDocumentation: false,
    };
  }

  // Развиваю английским, для себя оставляю комментарии именно так. В компании, разумеется, буду писать их на русском,
  // in this snippet most intresting part is `key`, we get key's name from onChange and magic
  handleCubeSizeChange = (id: number, key: keyof ICubeParams, value: string) => {
    this.setState((prevState) => ({
      cubes: prevState.cubes.map((cube) =>
        cube.parameters.id === id
          ? { ...cube, parameters: { ...cube.parameters, [key]: value } }
          : cube,
      ),
    }));
  };

  handleOnCreating = (key: keyof ICubeParams, value: string | number) => {
    this.setState((prevState) => ({
      cubeCreating: {
        ...prevState.cubeCreating, // old properties spreading
        id: Math.random(),
        [key]: value,
      },
    }));
  };
  handleCubeCreate = (cube: ICubeParams) => {
    this.setState(() => ({
      cubes: [...this.state.cubes, { parameters: cube }],
    }));
  };

  handleCubeDelete = (id: number) => {
    this.setState((prevState) => ({
      cubes: prevState.cubes.filter((cube) => id !== cube.parameters.id),
    }));
  };

  getModel = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <h1>List of CUBES</h1>

        <div id="display">
          <div className="cubes">
            <h4>Create cube</h4>
            <div className="create-section">
              <div className="create">
                <div className="text-block">
                  <div className="info">
                    <label>width:</label>
                    <input
                      value={this.state.cubeCreating.width}
                      onChange={(e) => this.handleOnCreating('width', e.target.value)}
                    />
                  </div>
                  <div className="info">
                    <label>height:</label>
                    <input
                      value={this.state.cubeCreating.height}
                      onChange={(e) => this.handleOnCreating('height', e.target.value)}
                    />
                  </div>
                  <div className="info">
                    <label>color:</label>
                    <input
                      value={this.state.cubeCreating.color}
                      onChange={(e) => this.handleOnCreating('color', e.target.value)}
                    />
                  </div>
                </div>
                <button onClick={() => this.handleCubeCreate(this.state.cubeCreating)}>
                  {'>'}
                </button>
              </div>
              <button onClick={this.getModel}>GET MODEL</button>
            </div>

            {this.state.cubes.map((cube) => {
              return (
                <div id={`${cube.parameters.id}`} className="item">
                  <div className="delete">
                    <span onClick={() => this.handleCubeDelete(cube.parameters.id)}>✕</span>
                  </div>
                  <div className="info">
                    <label>width:</label>
                    <input
                      className="text"
                      value={cube.parameters.width}
                      onChange={(e) =>
                        this.handleCubeSizeChange(cube.parameters.id, 'width', e.target.value)
                      }
                    />
                  </div>
                  <div className="info">
                    <label>height:</label>
                    <input
                      className="text"
                      value={cube.parameters.height}
                      onChange={(e) =>
                        this.handleCubeSizeChange(cube.parameters.id, 'height', e.target.value)
                      }
                    />
                  </div>
                  <div className="info">
                    <label>color:</label>
                    <input
                      className="text"
                      value={cube.parameters.color}
                      onChange={(e) =>
                        this.handleCubeSizeChange(cube.parameters.id, 'color', e.target.value)
                      }
                    />
                  </div>
                  <div className="cube">
                    cube proportions: {cube.parameters.width}x{cube.parameters.height}, color:{' '}
                    {cube.parameters.color}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="documantation-section">s</div>
      </div>
    );
  }
}

export default App;

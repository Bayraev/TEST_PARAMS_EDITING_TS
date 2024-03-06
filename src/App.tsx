import { Component } from 'react';
import './App.css';

interface ICubeParams {
  id: number;
  width: number;
  height: number;
  depth: number;
}

interface ICubeAddtionalParams {
  paramKeyName: string;
  paramKeyValue: any;
}

interface ICube {
  parameters: ICubeParams;
  additionalParameters: ICubeAddtionalParams[];
}

interface IModel {
  cubes: ICube[];
  cubeCreating: ICubeParams;
  cubeCreatingAdditional: ICubeAddtionalParams[];
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
            depth: 300,
          },
          additionalParameters: [
            {
              paramKeyName: 'README',
              paramKeyValue: 'GO CHECK IT!',
            },
            {
              paramKeyName: 'README',
              paramKeyValue: 'GO CHECK IT!',
            },
          ],
        },
        {
          parameters: {
            id: 3,
            width: 200,
            height: 200,
            depth: 300,
          },
          additionalParameters: [],
        },
      ],
      cubeCreating: {
        id: 4,
        width: 0,
        height: 0,
        depth: 0,
      },
      cubeCreatingAdditional: [],
      seeDocumentation: false,
    };
  }

  // Развиваю английским, для себя оставляю комментарии именно так. В компании, разумеется, буду писать их на русском,
  // in this snippet most intresting part is `key`, we get key's name from onChange and magic
  handleCubeSizeChange = (id: number, key: keyof ICubeParams, value: string) => {
    this.setState((prevState: IModel) => ({
      cubes: prevState.cubes.map((cube) =>
        cube.parameters.id == id
          ? { ...cube, parameters: { ...cube.parameters, [key]: value } }
          : cube,
      ),
    }));
  };
  handleChangeAdditionalParameters = (
    id: number, // id of cube in parameters
    index: number, // index of changing additionalParameter
    key: string, // key to change
    value: any, // value to key above
  ) => {
    this.setState((prevState: IModel) => {
      const updatedCubes = prevState.cubes.map((cube: ICube) => {
        if (cube.parameters.id === id) {
          return {
            ...cube,
            additionalParameters: cube.additionalParameters.map(
              (param: ICubeAddtionalParams, i) => {
                if (i === index) {
                  return {
                    ...param,
                    paramKeyName: key,
                    paramKeyValue: value,
                  };
                }
                return param;
              },
            ),
          };
        }
        return cube;
      });

      return {
        ...prevState,
        cubes: updatedCubes,
      };
    });
  };

  handleOnCreating = (key: keyof ICubeParams, value: string | number) => {
    this.setState((prevState: IModel) => ({
      cubeCreating: {
        ...prevState.cubeCreating, // old properties spreading
        id: Math.random(),
        [key]: value,
      },
    }));
  };
  handleCubeCreate = (parameters: ICubeParams, additionalParameters: ICubeAddtionalParams[]) => {
    this.setState((prevState: IModel) => ({
      cubes: [...this.state.cubes, { parameters, additionalParameters }],
      cubeCreatingAdditional: [],
    }));
  };

  handleCubeDelete = (id: number) => {
    this.setState((prevState: IModel) => ({
      cubes: prevState.cubes.filter((cube) => id !== cube.parameters.id),
    }));
  };

  handleAddNewType = () => {
    this.setState((prevState: IModel) => ({
      cubeCreatingAdditional: [
        ...prevState.cubeCreatingAdditional,
        {
          paramKeyName: '',
          paramKeyValue: '',
        },
      ],
    }));
  };

  handleChange = (index: number, key: keyof ICubeAddtionalParams, keyValue: string) => {
    this.setState((prevState: IModel) => ({
      cubeCreatingAdditional: prevState.cubeCreatingAdditional.map(
        (param: ICubeAddtionalParams, i) => {
          return i === index ? { ...param, [key]: keyValue } : param;
        },
      ),
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
                    <label>depth:</label>
                    <input
                      value={this.state.cubeCreating.depth}
                      onChange={(e) => this.handleOnCreating('depth', e.target.value)}
                    />
                  </div>
                  {this.state.cubeCreatingAdditional.map((param: ICubeAddtionalParams, index) => {
                    return (
                      <div className="info">
                        <input
                          className="key-field"
                          value={param.paramKeyName}
                          onChange={(e) => this.handleChange(index, 'paramKeyName', e.target.value)}
                        />
                        <input
                          value={param.paramKeyValue}
                          onChange={(e) =>
                            this.handleChange(index, 'paramKeyValue', e.target.value)
                          }
                        />
                      </div>
                    );
                  })}
                  <div className="info">
                    <button className="add-new-type" onClick={this.handleAddNewType}>
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() =>
                    this.handleCubeCreate(
                      this.state.cubeCreating,
                      this.state.cubeCreatingAdditional,
                    )
                  }>
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
                    <label>depth:</label>
                    <input
                      className="text"
                      value={cube.parameters.depth}
                      onChange={(e) =>
                        this.handleCubeSizeChange(cube.parameters.id, 'depth', e.target.value)
                      }
                    />
                  </div>

                  {cube.additionalParameters.length > 0 &&
                    cube.additionalParameters.map((param: ICubeAddtionalParams, index) => {
                      return (
                        <div className="info">
                          <label>{param.paramKeyName}:</label>
                          <input
                            className="text"
                            value={param.paramKeyValue}
                            onChange={(e) =>
                              this.handleChangeAdditionalParameters(
                                cube.parameters.id,
                                index,
                                param.paramKeyName,
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      );
                    })}

                  <div className="cube">
                    cube proportions: {cube.parameters.width}x{cube.parameters.height}, depth:{' '}
                    {cube.parameters.depth}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <a href="">R E A D M E . m d</a>
      </div>
    );
  }
}

export default App;

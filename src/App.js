import React from "react";
import "./App.css";
import Game from "./Game";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.game = new Game();
  }
  componentDidMount() {
    setInterval(() => {
      this.game.update();
      this.setState({});
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Dönər Diyarı</header>
        <div style={{ marginBottom: "15px" }}>
          Dönər Sayi: {this.game.manufacturedDoner} <br></br>
          <button
            disabled={!this.game.canMakeDoner(1)}
            onClick={() => this.game.makeDoner()}
            type="button"
          >
            Dönər Düzəlt
          </button>
        </div>

        <div>
          <h2>Biznes</h2>
          <hr></hr>
          <table>
            <tr>
              <td style={{ width: "150px" }}>Kassadakı pul:</td>
              <td>{this.game.money}$</td>
            </tr>
            <tr>
              <td>Qalan Dönərlər:</td>
              <td>{this.game.currentDoner}</td>
            </tr>
            <tr>
              <td>Qiymət:</td>
              <td>{this.game.price}$</td>
              <td>
                <button type="button" onClick={this.game.increasePrice}>
                  +
                </button>
              </td>
              <td>
                <button
                  type="button"
                  disabled={!this.game.canDecreasePrice()}
                  onClick={this.game.decreasePrice}
                >
                  -
                </button>
              </td>
            </tr>
            <tr>
              <td>Xalqın tələbi:</td>
              <td>{this.game.demandRate}%</td>
            </tr>
          </table>
          <h2>Manifaktura</h2>
          <hr></hr>
          <table>
            <tr>
              <td style={{ width: "150px" }}>Dönər/saniyə:</td>
              <td>{this.game.lastManufacturedRate}</td>
            </tr>
            <tr>
              <td>Ləvazimat:</td>
              <span>
                <td>{this.game.currentMaterial} qr</td>
              </span>{" "}
              <button
                disabled={!this.game.canBuyMaterial()}
                onClick={this.game.buyMaterial}
                type="button"
              >
                Ləvazimat al({this.game.materialCost}$)
              </button>
            </tr>
            {this.game.canShowAutoBuyer() ? (
              <tr>
                <td>Satın Alım Müdürü:</td>

                {this.game.hasAutoBuyer ? (
                  <span>
                    <td>{this.game.isAutoBuyerActive ? "Aktif" : "Dayandı"}</td>
                    <button
                      onClick={
                        this.game.isAutoBuyerActive
                          ? this.game.stopAutoBuyer
                          : this.game.runAutoBuyer
                      }
                      type="button"
                    >
                      {this.game.isAutoBuyerActive ? "Dayandır" : "Başlat"}
                    </button>
                  </span>
                ) : (
                  <tr>
                    <td>Yoxdur</td>
                    <td>
                      <button
                        onClick={this.game.buyAutoBuyer}
                        disabled={!this.game.canBuyAutoBuyer()}
                        type="button"
                      >
                        Satın Alım Müdürü Al({this.game.autoBuyerCost}$)
                      </button>
                    </td>
                  </tr>
                )}
              </tr>
            ) : (
              <tr>
                <td>Satın Alım Müdürü:</td>
                <td>Yoxdur</td>
              </tr>
            )}
          </table>

          <br></br>
          <br></br>
          <h2>İşçi</h2>
          <hr></hr>
          <table>
            <tr>
              <td style={{ width: "80px" }}>Çıraq:</td>
              <td>{this.game.autoGenerators.errandBoy}</td>
              <td>
                <button
                  disabled={!this.game.canBuyAutoGenerator("ERRAND_BOY")}
                  onClick={() => this.game.buyAutoGenerator("ERRAND_BOY")}
                  type="button"
                >
                  Çıraq al({this.game.autoGenerators.errandBoyCost}$)
                </button>
              </td>
            </tr>
            <tr>
              <td>Kalfa:</td>
              <td>{this.game.autoGenerators.foreman}</td>
              <td>
                <button
                  disabled={!this.game.canBuyAutoGenerator("FOREMAN")}
                  onClick={() => this.game.buyAutoGenerator("FOREMAN")}
                  type="button"
                >
                  Kalfa al ({this.game.autoGenerators.foremanCost}$)
                </button>
              </td>
            </tr>
            <tr>
              <td>Usta:</td>
              <td>{this.game.autoGenerators.master}</td>
              <td>
                <button
                  disabled={!this.game.canBuyAutoGenerator("MASTER")}
                  onClick={() => this.game.buyAutoGenerator("MASTER")}
                  type="button"
                >
                  Usta al({this.game.autoGenerators.masterCost}$)
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

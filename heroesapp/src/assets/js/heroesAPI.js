/**
 * controle das requisiçoes da api de Heroes
 */
import axios from 'axios';
import $ from 'jquery';

class heroesAPI {

  constructor() {
    this.apiHost = 'http://heroes.qanw.com.br:5638/';

    this.methods = {
      heroList: 'heroes',
      heroById: 'heroes/',
      heroPhoto: 'photos',
      heroSpecialties: 'specialties',
      heroClasses: 'classes',
    }

    this.loader =null;
  }


  /**
  *@description Busca lista de herois
   **/
  getHeroList = function (_callback) {

    if(!this.loader) this.loader = $("#loading");
    this.loader.show();

    axios
      .get(this.apiHost + this.methods.heroList)
      .then(response => {
        _callback && _callback(response.data)
        this.loader.hide();
      })
      .catch(error => {
        console.log(error);
        _callback && _callback([])
        this.loader.hide();
      })
  }

  /**
   *@description Busca heroi especifico por ID
   */
  getHeroById = function (_params, _callback) {

    if(!this.loader) this.loader = $("#loading");
    this.loader.show();

    axios
      .get(this.apiHost + this.methods.heroById + _params)
      .then(response => {
        _callback && _callback(response.data)
        this.loader.hide();
      })
      .catch(error => {
        console.log(error);
        _callback && _callback([])
        this.loader.hide();
      })
  }

  /**
   *@description Exclui heroi por ID
   */
  deleteHeroById = function (_params, _callback) {

    if(!this.loader) this.loader = $("#loading");
    this.loader.show();

    axios
      .delete(this.apiHost + this.methods.heroById + _params)
      .then(response => {
        _callback && _callback(response.data)
        this.loader.hide();
      })
      .catch(error => {
        console.log(error);
        _callback && _callback([])
        this.loader.hide();
      })
  }

  /**
   *@description Busca lista de especialidades de herois
   */
  getHeroSpecialties = function (_callback) {

    axios
      .get(this.apiHost + this.methods.heroSpecialties)
      .then(response => {
        _callback && _callback(response.data)
      })
      .catch(error => {
        console.log(error);
        _callback && _callback([])
      })
  }

  /**
   *@description Busca lista de classes de herois
   */
  getHeroClasses = function (_callback) {

    axios
      .get(this.apiHost + this.methods.heroClasses)
      .then(response => {
        _callback && _callback(response.data)
      })
      .catch(error => {
        console.log(error);
        _callback && _callback([])
      })
  }

  /**
   *@description Busca lista de classes de herois
   */
  saveHeroPhoto = function (_file,_callback) {

    if(!this.loader) this.loader = $("#loading");
    this.loader.show();

    var bodyFormData = new FormData();

    bodyFormData.append('file', _file);

    axios({
      method: 'post',
      url: this.apiHost + this.methods.heroPhoto,
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(response => {
        //handle success
        _callback && _callback(response.data)
        this.loader.hide();
      })
      .catch(error => {
        //handle error
        console.log(error);
        _callback && _callback([])
        this.loader.hide();
      });
  }

  /**
   *@description Cria um novo heroi
   **/
  createHeroData = function (_data, _callback) {

    if(!this.loader) this.loader = $("#loading");
    this.loader.show();

    var headers = {'Content-Type': 'application/json'};

    axios
      .post(this.apiHost + this.methods.heroList, _data, {headers: headers})
      .then(response => {
        _callback && _callback(response.data)
        this.loader.hide();
      })
      .catch(error => {
        console.log(error);
        _callback && _callback([])
        this.loader.hide();
      })
  }

  /**
   *@description Atualiza dados do heroi especifico por ID
   */
  updateHeroData = function (_id, _data, _callback) {

    if(!this.loader) this.loader = $("#loading");
    this.loader.show();

    var headers = {'Content-Type': 'application/json'};

    axios
      .put(this.apiHost + this.methods.heroById + _id, _data, {headers: headers})
      .then(response => {
        _callback && _callback(response.data)
        this.loader.hide();
      })
      .catch(error => {
        console.log(error);
        _callback && _callback([])
        this.loader.hide();
      })
  }

}

export default heroesAPI

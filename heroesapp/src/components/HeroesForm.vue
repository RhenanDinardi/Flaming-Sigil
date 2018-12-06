<template>
  <div>

    <div class="container d-flex justify-content-between mt-5 mb-3">

      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputName">Nome</label>
            <input type="text" class="form-control" id="inputName" placeholder="Digite um nome..." v-model="hero.name">
          </div>
          <div class="form-group col-md-3">
            <label for="selectEspecialties">Especialidades</label>
            <select id="selectEspecialties" class="form-control" v-model="hero.specialties[0]">
              <option v-for="specialty in specialtiesList" v-bind:value="specialty">
                {{ specialty.name }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label for="selectClass">Classe</label>
            <select id="selectClass" class="form-control" v-model="selectedClass" v-on:change="setClassData">
              <option v-for="heroClass in classesList" v-bind:value="heroClass">
                {{ heroClass.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="inputHealth">Vida</label>
            <input type="text" class="form-control" id="inputHealth" placeholder="" v-model="hero.health_points">
          </div>
          <div class="form-group col-md-3">
            <label for="inputDef">Defesa</label>
            <input type="text" class="form-control" id="inputDef" placeholder="" v-model="hero.defense">
          </div>

          <div class="form-group col-md-2">
            <label for="inputDamage">Dano</label>
            <input type="text" class="form-control" id="inputDamage" placeholder="" v-model="hero.damage">
          </div>
          <div class="form-group col-md-2">
            <label for="inputAtkSpd">Vel. de Ataque</label>
            <input type="text" class="form-control" id="inputAtkSpd" placeholder="" v-model="hero.attack_speed">
          </div>
          <div class="form-group col-md-2">
            <label for="inputMoveSpd">Vel. de Movimento</label>
            <input type="text" class="form-control" id="inputMoveSpd" placeholder="" v-model="hero.movement_speed">
          </div>

        </div>
      </form>

    </div>

    <div class="container justify-content-between mt-5 mb-3">

      <div class="row mb-1">
        <div class="col-md-12">
          <h5 class="gallery-title">Galeria do personagem</h5>
        </div>
      </div>

      <div class="row p-3">
        <div class="col-md-2"v-for="pic in hero.photos" v-bind:key="pic">
          <div class="container-img">
          <img class="img-fluid my-4 display-img" v-bind:src="getPhoto(pic)">
          </div>
        </div>

      </div>

      <div class="row mb-1">
        <div class="col-md-12">
          <div class="drop-file-container">
            <h3>Click/Drag and drop here</h3>
            <input type="file" accept="image/*" id="photoHero" v-on:change="uploadFile">
          </div>
        </div>
      </div>

    </div>

    <div class="container no-color justify-content-between mb-4">
      <div class="row mt-1">
        <div class="col-md-12">
          <button class="btn btn-primary mx-2 float-right" type="submit" v-on:click="saveHero()">
            <i class="material-icons">check</i> Salvar
          </button>
          <button class="btn btn-secondary mx-2 float-right" v-on:click="returnToList()">
            <i class="material-icons">keyboard_return</i> Cancelar
          </button>
        </div>
    </div>

    </div>

  </div>
</template>

<script>
  import heroesAPI from '../assets/js/heroesAPI'
  import _ from 'lodash';


  //inicializando API
  const API = new heroesAPI();
  const fileReader = new FileReader();

export default {
  name: 'HeroesForm',
  data () {
    return {
      loadedApis: 0,
      totalApis: 2,
      hero: {
        specialties: [],
        photos: [],
        class_id: null,
        class_name: null
      },
      specialtiesList:[{id: 0, name: 'Selecione uma especialidade'}],
      classesList: [{id: 0, name: 'Selecione uma classe'}],
      selectedClass: null,
      heroId: undefined
    }
  },
  methods: {
    /**
     * @description ao carregar APis iniciais, checa se existe Id para pre carregar dados de ediçaodo heroi
     * @param
     */
    checkForHeroId: function(){

      var _self = this;

      if(this.loadedApis == this.totalApis) {

        if(this.$route.params.id != undefined) {

          this.heroId = this.$route.params.id;

          API.getHeroById(this.heroId, function (_data) {

            _self.hero = _data;

            _self.selectedClass = _self.classesList.filter(function(_class, _index){

              return _class.id == _self.hero.class_id;
            })[0];

            console.log("dados heroi ", _self.hero);
          })
        }
        //criaçao, parametros inciais
        else{

          this.hero.specialties = [this.specialtiesList[0]];
          this.selectedClass =  this.classesList[0];
        }
      }
    },
    /**
     * @description troca classe selecionada, atualiza nome da classe ao model
     */
    setClassData: function(){

      this.hero.class_id = this.selectedClass.id;;
      this.hero.class_name = this.selectedClass.name;
    },
    /**
     * @description Retorna imagem do heroi
     * @param id da imagem
     */
    getPhoto: function(_id) {

      return  API.apiHost + API.methods.heroPhoto + '/' + _id;
    },

    /**
     @description Carrega uma arquivo, verifica se o arquivo é uma imagem e salva/adiciona ao heroi linkado na tela
     */
    uploadFile: function(event) {

      var _self = this;

      if(event.target.files.length > 0) {

        var uploadedFile = event.target.files[0];
        var allowedType = /image.*/;

        if ( (uploadedFile.type.match(allowedType)) ) {

          fileReader.onload = function (e) {

            API.saveHeroPhoto(uploadedFile, function(data){

              console.log("and finally data ", data);
              _self.hero.photos.push(data[0].imageId);
              event.target.value = '';
              _self.$toastr('success', 'Imagem salva com sucesso.');

            })
          }

          fileReader.readAsDataURL(uploadedFile);

        } else {

          //arquivo nao é imagem
          event.target.value = '';
          _self.$toastr('warning', 'Arquivo não é uma imagem.');
        }
      }

    },

    /**
     * @description Cria/salva o heroi, validando os campos obrigatorios primeiramente
     */
    saveHero: function() {

      var _self= this;

      var saveData = this.validateForm();

      if(saveData.errors.length > 0) {

        this.$toastr('error', saveData.errors[0]);
      }
      else{

        //ediçao
        if(this.heroId != undefined) {

          API.updateHeroData(this.heroId, saveData.data, function (data) {

            _self.$toastr('success', "Dados do herói atualizados com sucesso.");
            setTimeout(function(){
              _self.returnToList();
            }, 2000);
          })
        }
        //criaçao
        else {
          API.createHeroData(saveData.data, function (data) {

            _self.$toastr('success', "Herói criado com sucesso.");
            setTimeout(function(){
              _self.returnToList();
            }, 2000);
          })
        }
      }

    },

    /**
     * @description Validando os campos obrigatorios primeiramente, convertendo campos para salvar
     */
    validateForm: function () {

      //validação de campos
      var erros =[];
      var formHero = _.cloneDeep(this.hero);

      var validation = {
        isValid: false,
        errors: erros,
        data: formHero
      }

      formHero.name = formHero.name.trim();
      if(!formHero.name || formHero.length == 0) {

        erros.push("Digite um nome.");
        return validation;
      }

      formHero.specialties[0] = formHero.specialties[0].id;
      if(formHero.specialties[0] == 0 ) {

        erros.push("Selecione uma especialidade.");
        return validation;
      }

      if(formHero.class_id == 0 ) {

        erros.push("Selecione uma classe.");
        return validation;
      }

      if(typeof formHero.health_points == 'string') formHero.health_points = parseFloat(formHero.health_points.trim().replace(/,/g, '.') );
      console.log( formHero.health_points );
      if (isNaN(formHero.health_points)) {

        erros.push("Valor para Vida deve ser numérico.");
        return validation;
      }

      if(typeof formHero.defense == 'string') formHero.defense = parseFloat(formHero.defense.trim().replace(/,/g, '.') );
      if (isNaN(formHero.defense)) {

        erros.push("Valor para Defesa deve ser numérico.");
        return validation;
      }

      if(typeof formHero.damage == 'string') formHero.damage = parseFloat(formHero.damage.trim().replace(/,/g, '.') );
      if (isNaN(formHero.damage)) {

        erros.push("Valor para Dano deve ser numérico.");
        return validation;
      }

      if(typeof formHero.attack_speed == 'string') formHero.attack_speed = parseFloat(formHero.attack_speed.trim().replace(/,/g, '.') );
      if (isNaN(formHero.attack_speed)) {

        erros.push("Valor para Velocidade de Ataque deve ser numérico.");
        return validation;
      }

      if(typeof formHero.movement_speed == 'string') formHero.movement_speed = parseFloat(formHero.movement_speed.trim().replace(/,/g, '.') );
      if (isNaN(formHero.movement_speed)) {

        erros.push("Valor para Velocidade de Movimento deve ser numérico.");
        return validation;
      }

      if (formHero.photos.length == 0) {

        erros.push("Pelo menos 1 (uma) imagem na galeria é obrigatória.");
        return validation;
      }

      validation.isValid = true;

      return validation;

    },

    returnToList: function(){
      this.$router.push('/');
    }
  },
  mounted: function() {

    var _self = this;

    //carregando inicialmente lista de especialidades
    API.getHeroSpecialties(function(_data){

      _self.specialtiesList = _self.specialtiesList.concat(_data);

      _self.loadedApis++;
      _self.checkForHeroId();
    });

    //carregando inicialmente lista de classes
    API.getHeroClasses(function(_data){

      _self.classesList = _self.classesList.concat(_data);

      _self.loadedApis++;
      _self.checkForHeroId();
    });

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container{
    padding: 15px;
    background-color: white;
    border-radius: 10px;
  }

  .no-color{
    background-color: transparent;
  }

  .material-icons{
    vertical-align: inherit;
  }

  label {
    color: #787f86;
  }

  .gallery-title{
    font-weight: 600;
    color: #0062cc;
    padding: 20px;
  }

  .container-img{
    min-width: 100%;
    min-height: 160px;
    width: 100%;
    height: 160px;
    background-color: #787f8633;
    text-align: center;
  }
  .display-img{
    height: 70%;
  }

  .drop-file-container{
    border: 3px solid #787f8633;
    border-radius: 5px;
    height: 200px;
    margin: 15px;
    position: relative;
  }

  .drop-file-container h3{
    color: #787f86;
    display: inline-block;
    top: 50%;
    left: 50%;
    position: absolute;
    margin-top: -16px;
    margin-left: -155px;
  }

  .drop-file-container input{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
    cursor: pointer;
  }

</style>

<template>
  <div>

    <div class="container d-flex justify-content-between mt-5 mb-3">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-busca"><i class="material-icons">search</i></span>
        </div>
        <input type="text" class="form-control" placeholder="Buscar por nome, classe, especialidade, outros..."v-on:input="inputSearch" v-model="search_input">
      </div>
      <div class="input-group-append">
        <button class="btn btn-primary" v-on:click="goToHero()">
          <i class="material-icons">add_circle</i> Novo
        </button>
      </div>
    </div>

    <hr />

    <div class="container d-flex justify-content-between mt-3 mb-3">
      <table class="table">
        <thead class="thead-light">
        <tr>
          <th scope="col"></th>
          <th scope="col" v-on:click="sortBy('name')">
            Nome
            <i class="material-icons" v-if="selectedSort == 'name' && headerSort.name == 'asc'">keyboard_arrow_down</i>
            <i class="material-icons" v-if="selectedSort == 'name' && headerSort.name == 'desc'">keyboard_arrow_up</i>
          </th>
          <th scope="col" v-on:click="sortBy('class_name')">
            Classe
            <i class="material-icons" v-if="selectedSort == 'class_name' && headerSort.class_name == 'asc'">keyboard_arrow_down</i>
            <i class="material-icons" v-if="selectedSort == 'class_name' && headerSort.class_name == 'desc'">keyboard_arrow_up</i>
          </th>
          <th scope="col" v-on:click="sortBy('specialty_name')">
            Especialidades
            <i class="material-icons" v-if="selectedSort == 'specialty_name' && headerSort.specialties == 'asc'">keyboard_arrow_down</i>
            <i class="material-icons" v-if="selectedSort == 'specialty_name' && headerSort.specialties == 'desc'">keyboard_arrow_up</i>
          </th>
          <th scope="col" v-on:click="sortBy('health_points')">
            Vida
            <i class="material-icons" v-if="selectedSort == 'health_points' && headerSort.health_points == 'asc'">keyboard_arrow_down</i>
            <i class="material-icons" v-if="selectedSort == 'health_points' && headerSort.health_points == 'desc'">keyboard_arrow_up</i>
          </th>
          <th scope="col" v-on:click="sortBy('defense')">
            Defesa
            <i class="material-icons" v-if="selectedSort == 'defense' && headerSort.defense == 'asc'">keyboard_arrow_down</i>
            <i class="material-icons" v-if="selectedSort == 'defense' && headerSort.defense == 'desc'">keyboard_arrow_up</i>
          </th>
          <th scope="col" v-on:click="sortBy('attack_speed')">
            Vel. de Ataque
            <i class="material-icons" v-if="selectedSort == 'attack_speed' && headerSort.attack_speed == 'asc'">keyboard_arrow_down</i>
            <i class="material-icons" v-if="selectedSort == 'attack_speed' && headerSort.attack_speed == 'desc'">keyboard_arrow_up</i>
          </th>
          <th scope="col" v-on:click="sortBy('movement_speed')">
            Vel. de Movimento
            <i class="material-icons" v-if="selectedSort == 'movement_speed' && headerSort.name == 'asc'">keyboard_arrow_down</i>
            <i class="material-icons" v-if="selectedSort == 'movement_speed' && headerSort.name == 'desc'">keyboard_arrow_up</i>
          </th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr  v-for="hero in viewHeroes" v-bind:key="hero.id">
          <td class="container-img">
           <img class="img-fluid my-2 display-img" v-bind:src="hero.displayPhoto">
          </td>
          <td><h5>{{hero.name}}</h5></td>
          <td><p>{{hero.class_name}}</p></td>
          <td><p>{{hero.specialty_name}}</p></td>
          <td><p>{{hero.health_points}}</p></td>
          <td><p>{{hero.defense}}</p></td>
          <td><p>{{hero.attack_speed}}</p></td>
          <td><p>{{hero.movement_speed}}</p></td>
          <td>
            <p>
              <i class="material-icons btn-action" title="Excluir herói" data-toggle="modal" data-target="#deleteModal" v-on:click="pickHeroToDelete(hero)">delete</i>
              <i class="material-icons btn-action" title="Editar herói" v-on:click="goToHero(hero.id)">edit</i>
            </p>
          </td>
        </tr>

        <tr  v-if="viewHeroes.length == 0">
          <td colspan="9"><p>Nenhum resultado encontrado.</p></td>
        </tr>

        </tbody>
      </table>
    </div>

    <!-- Modal de confirmaçao de exclusao-->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Confirmar exclusão do herói</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Tem certeza que deseja excluir <b>{{selectedDeleteHero.name}}</b> da guilda?
            Seus dados não poderão ser recuperados.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              <i class="material-icons">keyboard_return</i>Cancelar
            </button>
            <button type="button" class="btn btn-danger" v-on:click="deleteHero">
              <i class="material-icons">delete_forever</i>Excluir Herói
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import heroesAPI from '../assets/js/heroesAPI';
  import $ from 'jquery';
  import _ from 'lodash';


  //inicializando API
  const API = new heroesAPI();
  const deleteModal = $("#deleteModal");

export default {
  name: 'HeroesList',
  data () {
    return {
      heroes: [],
      viewHeroes: [],
      search_input: '',
      counter: 0,
      selectedSort: '',
      headerSort: {
        name: '',
        class_name: '',
        specialty_name: '',
        health_points: '',
        defense: '',
        attack_speed: '',
        movement_speed: ''
      },
      selectedDeleteHero: {}
    }
  },
  methods: {
    /**
     * @description Realiza busca do campo de input apos delay
     */
    inputSearch: _.debounce(function() {

      var search = this.search_input.trim().toLowerCase();

      function filterIt(arr, searchKey) {
        return arr.filter(function(obj) {
          return Object.keys(obj).some(function(key) {

            if( key !== 'id' && key !== 'class_id' && key !== 'photos' && key !== 'specialties' && key !== 'displayPhoto') {
              var test = obj[key].toString().toLowerCase();
              return test.includes(searchKey);
            }

          })
        });
      }

      if(search == '' || search.length > 2) this.viewHeroes = filterIt( this.heroes, search);


    }, 800),

    /**
     * @description Ordena lista na tela de acordo com o campo selecionado
     * @param _field campo que será ordenado
     */
    sortBy: function(_field) {

      this.selectedSort = _field;
      this.headerSort[_field] = (this.headerSort[_field] == 'asc') ? 'desc' : 'asc';

      this.viewHeroes = _.orderBy(this.viewHeroes, _field, this.headerSort[_field]);
    },

    /**
     * @description Busca lista de herois e faz tratamentos de valores para bind de tela
     * @param _callback callback opcional para ser chamado apos listagem
     */
    getHeroesList: function (_callback){

      var _self = this;

      //carregando inicialmente lista de heroes
      API.getHeroList(function(_data){

        _self.heroes = _data;

        //busca imagem dinamica de cada heroi
        _self.heroes.forEach(function(hero, index){

          hero.displayPhoto = API.apiHost + API.methods.heroPhoto + '/' + hero.photos[0];
          hero.specialty_name = hero.specialties[0].name;
        });

        _self.viewHeroes = _.cloneDeep(_self.heroes)

        _callback && _callback();

      });

    },

    /**
     * @description Redireciona para criaçao/ediçao de um heroi
     * @param _id id do heroi a ser editado, se nulo, vai ser criaçao
     */
    goToHero: function(_id) {

      if(!_id) {
        this.$router.push('Create');
      }
      else{
        this.$router.push('Edit/' + _id);
      }
    },

    /**
     * @description Seleciona o heroi para exclusao, salva seu nome e id para modal
     * @param heroi a ser excluido
     */
    pickHeroToDelete: function(_hero) {

      this.selectedDeleteHero = _hero;
    },

    /**
     * @description Excluir heroi e atualiza listagem
     */
    deleteHero: function() {

      var _self = this;

      API.deleteHeroById(this.selectedDeleteHero.id, function(data){

        //confirma exclusao do heroi
        _self.$toastr('success', _self.selectedDeleteHero.name + ' removido da guilda com sucesso.');

        //busca lista novamente
        _self.getHeroesList(function(){

          deleteModal.modal('hide');
        });
      });
    }
  },
  mounted: function() {

    $("#pageTitle").text("Meus Personagens");

    //carregando inicialmente lista de heroes
    this.getHeroesList();

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn-action{
    color: #0062cc;
    margin-right: 10px;
    cursor: pointer;
  }

  .container-img{
    min-width: 50px;
    min-height: 50px;
    width: 120px;
    height: 120px;
    text-align: center;
  }

  .display-img{
    height: 70%;
  }

  .material-icons{
    vertical-align: inherit;
  }

  .table th {
    color: #787f86;
    cursor: pointer;
  }

  .table td, .table th {
    vertical-align: middle;
  }

  .table td{
    background: white;
  }

  .table td > h5, .table td > p {
    margin: 0;
  }

  .table tr > th {
    background-color: white;
  }

  .input-group-append > .btn-primary {
    margin-bottom: 1rem!important;
    padding: 0.375rem 1.7rem;
    margin-left: 2rem;
  }

</style>

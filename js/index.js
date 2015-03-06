$(function(){
  $( "#datepicker" ).datepicker();

  function Event(time1, data1, name1, eventText1, attitude1, formatText1, img1, place1){
    this.data = data1;
    this.name = name1;
    this.eventText = eventText1;
    this.time = time1;
    this.attitude = attitude1;
    this.formatText = formatText1;
    this.img = img1;
    this.place = place1;  
  };
//new list new event
    function getEvents(){
      var tmp = localStorage.length;
      if (tmp > 0){
        for (var i = 0; i < tmp; i++){
          var ev = localStorage.key(i); //get key of local
          if(ev.indexOf(ev.match(/\d{8}/g)) == 0){ //pattern
            //create a mini html 
            $('<li>').attr({
              class: 'date',
              'data-item': ev
            }).prependTo('#listHolder');
            $('<form>').prependTo('#listHolder li:first');
            $('<input>')
              .attr({
                class: 'list', 
                'type': "button", 
                'value':"Delete event", 
                'data-delete': 'delete'
              }).prependTo('.date form:first');
            $('<a>').attr({
                href:'#event', 
                class: 'list', 
                'hrefMain':"#event1", 
                'lookEvent': JSON.parse(localStorage.getItem(ev)).time
              }).text(JSON.parse(localStorage.getItem(ev)).name).prependTo('.date form:first');
            $('<p>',{
              class: 'list'
            })
              .text('Дата создания события:' + '  ' + JSON.parse(localStorage.getItem(ev)).data).prependTo('.date form:first');
            $('<div>',{class: 'format attitude'}).addClass(JSON.parse(localStorage.getItem(ev)).attitude).prependTo('.date form:first');
          };
        };
      }; 
    };
    getEvents(); // samovi3ov

      $(document).on('click', function(el){
    var target = $(el.target);
    // hidder the text
    var conteiner = target.attr('hrefMain');
      if(conteiner){
        $('#eventNew').addClass("motion");
        $('#main').addClass("motion");
        $('#event1').addClass("motion");
        $('#listEvent').addClass("motion");
        $('#map-canvas').addClass("motion");
        $($(conteiner)).toggleClass('motion');
        target.addClass('bold');
      };
// WYSIWYG
    var changeFormat = target.attr('texFormatting');
      if(changeFormat){
        $($('#eventText')).toggleClass(changeFormat);
      };
// selection color
    var changeColor = target.attr('colorInfo');
      if(changeColor){
        $($('#eventText')).removeClass("green1").removeClass("red1").removeClass("blue1").removeClass("aqua1").removeClass("black1").removeClass("yellow1").removeClass("whitesmoke1").addClass(changeColor); //class witch in css
      };
// selection attitude
     var changeAttitude = target.attr('attitudeData');
      if(changeAttitude){
        $('#eventText').attr('attitudeData1', changeAttitude);
        $('.attitude').removeClass("borderRadius");
        target.addClass("borderRadius");
      };
        // add image(picture by url)
    var imgAdd = target.attr('data-img');
      if(imgAdd){
      $('<img>').attr({ //tag
        id:"img", 
        src:$('.img').val().trim()
      }).prependTo('#Img');
      $('.img').addClass('motion')
    };
    
    //create
    var newEvent = target.attr('name');  
      if(newEvent){
        var time = $('#datepicker').val().replace(/\//g, ',').split(",").reverse().join("");//test
        var data = $('#datepicker').val();//value
        var name = $('#name').val().trim();//trimer
        var eventText = $('#eventText').val().trim();
        var attitude = $('#eventText').attr('attitudeData1');
        var formatText = $('#eventText').attr('class');//peak of class
        var img = $('#img').attr('src');
        var place = $('.place').attr('texFormatting');//isn't work 
        
        
      if(name !== ''){//test by empty
        if(eventText !== ''){//test by empty
          if(data !== ''){//test by empty
            var createEvent = new Event(time, data, name, eventText, attitude, formatText, img);
            //list html
            $('<li>').attr({
              class: 'date',
              'data-item': time}).prependTo('#listHolder');
            $('<form>').prependTo('#listHolder li:first');
            $('<input>')
              .attr({
                class: 'list',
                'type': "button", 
                'value':"delete", 
                'data-delete': 'delete'}).prependTo('.date form:first');
            $('<a>')
              .attr({
                href:'#event',
                class: 'list', 
                'hrefMain': "#event1", 
                'lookEvent': time}).text(name).prependTo('.date form:first');
            $('<p>',{
              class: 'list'
            }).text('date:   ' + data).prependTo('.date form:first');
            $('<div>',{
              class: 'format attitude'
            }).addClass(attitude).prependTo('.date form:first');
            $('#name').val("");//reset after btn "create event"
            $('#datepicker').val("");//reset after btn "create event"
            $('#eventText').val("");//reset after btn "create event"
            $('#name').attr({placeholder:"Name of event"});//reset after btn "create event"
            $('.img').removeClass('motion');//reset after btn "create event"
            $('#Img').children().remove();//reset after btn "create event"
            localStorage.setItem(time, JSON.stringify(createEvent)); // push to JSON
           }
           else { //if isn't select a date
            $('#datepicker').attr({ 
              placeholder:"Enter a data"}
              )};
        }
        else{ //if isn't enter the text 
          $('#eventText').attr({
            placeholder:"Please, enter the text by event"}
            ).css({
              'color': 'red'
            });};
      }
      else{ //if == empty 
        $('#name').attr({
          placeholder:"Please, enter the name of event"})};
      };
    
      var deleteEvent = target.attr('data-delete'); //delete event in event list
      if(deleteEvent) 
      {
        if(confirm("Delete the event? Are you sure?")){
          var nana = $(target).parent().parent(); //with one parent isn't work
          nana.remove();
          localStorage.removeItem(nana.attr('data-item'));
        };
      };

      //sort!!!!!!!!!!!!!!!!!!!!!!!!
     
    var sortData = target.attr('data-sortData');//sort by data
      if(sortData){ //if click of sort by data
        var tmp = localStorage.length;
        if(tmp > 0){
          $('#listHolder li').remove(); //back tag with li
          var evArr = [];
          for(var i = 0; i < tmp; i++){
            var match = localStorage.key(i); //keys
            if(match.indexOf(match.match(/\d{8}/g)) == 0){//test
              evArr.push(match);           
            };
          };
          var evSort = evArr.sort();
          for(var j = 0; j < evSort.length; j++){
           var ev = evSort[j];
            $('<li>',{ //list by html
              class: 'date'
            }).attr('data-item', ev).prependTo('#listHolder');
            $('<form>').prependTo('#listHolder li:first');
            $('<input>').attr({
                class: 'list', 
                'type': "button", 
                'value':"Delete the event", 
                'data-delete': 'delete'}).prependTo('.date form:first');
            $('<a>').attr({
                href:'#event', 
                class: 'list', 
                'hrefMain':"#event1", 
                'lookEvent': JSON.parse(localStorage.getItem(ev)).time}).text(JSON.parse(localStorage.getItem(ev)).name).prependTo('.date form:first');
            $('<p>',{
              class: 'list'
            }).text('Date of create by event:     ' + JSON.parse(localStorage.getItem(ev)).data).prependTo('.date form:first');
            $('<div>', {
              class: 'format attitude'
            }).addClass(JSON.parse(localStorage.getItem(ev)).attitude).prependTo('.date form:first');
          };
        }; 
      };
       
    var sortData = target.attr('dataSortAttitude'); //sort attitude
    if(sortData){
      var tmp = localStorage.length;
      if(tmp > 0){
        var attitudeArr = [];
        $('#listHolder li').remove();//back li
        for(var i = 0; i < tmp; i++){
          var match = localStorage.key(i);
          if(match.indexOf(match.match(/\d{8}/g)) == 0){
            attitudeArr.push(JSON.parse(localStorage.getItem(match)));           
          };
        };
           var sortAttitudeArr = attitudeArr.sort(function(event1, event2) {
              if (event1.attitude < event2.attitude) {
                return -1;
              }
              if (event1.attitude > event2.attitude) {
                return 1;
              }
              else{
              return 0;
            }
            });
          for(var j = 0; j < sortAttitudeArr.length; j++){
            var ev = sortAttitudeArr[j].time;
            $('<li>').attr({
              class: 'date', 'data-item': ev
            }).prependTo('#listHolder');
            $('<form>').prependTo('#listHolder li:first');
            $('<input>').attr({
              class: 'list',
              'type': "button", 
              'value':"Удалить событие", 
              'data-delete': 'delete'
            }).prependTo('.date form:first');
            $('<a>').attr({
              href:'#event', 
              class: 'list', 
              'hrefMain':"#event1", 
              'lookEvent': JSON.parse(localStorage.getItem(ev)).time}).text(JSON.parse(localStorage.getItem(ev)).name).prependTo('.date form:first');
            $('<p>',{
              class: 'list'
            }).text('Date create by event:   ' + JSON.parse(localStorage.getItem(ev)).data).prependTo('.date form:first');
            $('<div>',{
              class: 'format attitude'
            }).addClass(JSON.parse(localStorage.getItem(ev)).attitude).prependTo('.date form:first');
          };
        }; 
      };
      
      //sort by textarea of sort name function search
    var searchName = target.attr('searchNameData');
    if(searchName){
      var tmp = localStorage.length;
      if(tmp > 0){
        var searchArr = [];
        for(var i = 0; i < tmp; i++){
          var match = localStorage.key(i);
          if(match.indexOf(match.match(/\d{8}/g)) == 0){
            searchArr.push(JSON.parse(localStorage.getItem(match)));           
          };
        };
        for(var j = 0; j < searchArr.length; j++){
          if(searchArr[j].name === $('#searchName').val().trim()){
            $('#listHolder li').remove();
            var ev = searchArr[j].time;
            $('<li>').attr({
              class: 'date','data-item': ev
            }).prependTo('#listHolder');
            $('<form>').prependTo('#listHolder li:first');
            $('<input>').attr({
              class: 'list', 
              'type': "button", 
              'value':"delete event", 
              'data-delete': 'delete'
            }).prependTo('.date form:first');
            $('<a>').attr({
              href:'#event', 
              class: 'list', 
              'hrefMain':"#event1", 
              'lookEvent': JSON.parse(localStorage.getItem(ev)).time
            }).text(JSON.parse(localStorage.getItem(ev)).name).prependTo('.date form:first');
            $('<p>',{
              class: 'list'
            }).text('date of create by event:' + '  ' + JSON.parse(localStorage.getItem(ev)).data).prependTo('.date form:first');
            $('<div>',{
              class: 'format attitude'
            }).addClass('Discribe:    ' + JSON.parse(localStorage.getItem(ev)).attitude).prependTo('.date form:first');
              break;
          }
          else { // if isn't write
            alert( "Error" );
          };
        };     
      }; 
    };

     
    var lookEvent = target.attr('lookEvent');// look on event
      if(lookEvent){
      $('#eventHolder').children().remove()
        if(!JSON.parse(localStorage.getItem(lookEvent)).img == 'undefined'){
          $('<img>',{
            id:"img", 
            src:JSON.parse(localStorage.getItem(lookEvent)).img
          }).prependTo('#eventHolder');
        };      
        $('<p>').attr(
          'class', 
          JSON.parse(localStorage.getItem(lookEvent)).formatText).text(JSON.parse(localStorage.getItem(lookEvent)).eventText).prependTo('#eventHolder');       
        $('<p>').text('Name:    ' + JSON.parse(localStorage.getItem(lookEvent)).name).prependTo('#eventHolder');
        $('<p>').text('Date:     ' + JSON.parse(localStorage.getItem(lookEvent)).data).prependTo('#eventHolder');
    };
  });
});
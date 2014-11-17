
<script>

           $(function() {

     //----------------------------------- A R T I S T S -----------------------------------------------------------

                function getArtists(tag, lastFMKey){
                    if (tag != '') {

                        $.ajax({
                        type: "GET",
                        url: "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag="+tag+"&api_key="+lastFMKey +"&format=json"
                        }).success(function( data ) {
                            //console.log(data);
                            
                            $('#output').html('');
                            if(data[0] !== undefined && data[0].title !== undefined) {
                                console.log("no data..");
                            } else {
                                for(var i=0; i < data.topartists.artist.length; i++){
                                    var artist = data.topartists.artist[i];
                                    console.log(artist.name)

                                    $.ajax({
                                        type: "GET",
                                        url: "http://ws.spotify.com/search/1/artist.json?q="+artist.name.replace(/\s+/g, '%20')

                                        }).done(function( data ) {
                                        var artistsURL = (data.artists[0].href);
                                            

                                            $('#output').append("<tr><td>" + '<iframe src="https://embed.spotify.com/?uri=' +artistsURL+ '" width="500" height="580" frameborder="0" allowtransparency="true"></iframe>' + "</td></tr>")


                                                   

                                        });
                                    }
                            }
                        }).fail(function(data) {

                            console.log('ajax fail..');
                        }); 
                    };
                }

            //--------------------------------- A L B U M S --------------------------------------------------------

            function getAlbums(tag, lastFMKey){
                    $.ajax({
                    type: "GET",
                    url: "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag="+tag+"&api_key="+lastFMKey+"&format=json"
                    }).success(function( data ) {
                        console.log(data);
                        
                        if(data[0] !== undefined && data[0].title !== undefined) {
                            console.log("no data..");
                        } else {
                            for(var i=0; i < data.topalbums.album.length; i++){
                                var album = data.topalbums.album[i];
                                console.log(album.name)

                                $.ajax({
                                    type: "GET",
                                    url: "http://ws.spotify.com/search/1/album.json?q="+album.name.replace(/\s+/g, '%20')

                                    }).done(function( data ) {
                                        var albumURL = (data.albums[0].href);

                                    //$('#output').append("<tr><td>" + '<iframe src="https://embed.spotify.com/?uri=' + albumURL + '" width="400" height="480" frameborder="0" allowtransparency="true"></iframe>' + "</td></tr>")

                                    $('#output').append("<tr><td>" + '<iframe src="https://embed.spotify.com/?uri=' +albumURL+ '" width="500" height="580" frameborder="0" allowtransparency="true"></iframe>' + "</td></tr>")


                                   


                                    });
                                }
                        } 
                    }).fail(function( data ) {
                            console.log("ajax failed");
                    });
                }


                //------------------------------------ T R A C K S --------------------------------------------
     
                function getTracks(tag, lastFMKey){
                    if (tag != '') {

                        $.ajax({
                        type: "GET",
                        url: "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag="+tag+"&api_key="+lastFMKey +"&format=json"
                        }).success(function( data ) {
                            
                            $('#output').html('');
                            if(data[0] !== undefined && data[0].title !== undefined) {
                                console.log("no data..");
                            } else {
                                for(var i=0; i < data.toptracks.track.length; i++){
                                    var track = data.toptracks.track[i];
                                    console.log(track.name)

                                    $.ajax({
                                        type: "GET",
                                        url: "http://ws.spotify.com/search/1/track.json?q="+track.name.replace(/\s+/g, '%20')

                                        }).done(function( data ) {
                                        var tracksURL = (data.tracks[0].href);
                                            

                                           $('#output').append("<tr><td>" + '<iframe src="https://embed.spotify.com/?uri=' +tracksURL+ '" width="500" height="580" frameborder="0" allowtransparency="true"></iframe>' + "</td></tr>")

                                        });
                                    }
                            }
                        }).fail(function(data) {

                            console.log('ajax fail..');
                        }); 
                    };
                }
                

                $("#form").click(function(event) {
                    event.preventDefault();


                    $('#output').empty();

                    var categorySRC =document.getElementById("mySelect").selectedIndex;
                    selectedSRC = (document.getElementsByTagName("option")[categorySRC].value);

                     event.preventDefault();


                    var tag = $('input#name').val();     

                    if(selectedSRC === "artistsSRC"){

                        getArtists(tag, "API_key");}
                    
                    else if(selectedSRC === "albumsSRC"){
                        
                        getAlbums(tag, "API_key");}

                    else if(selectedSRC === "trackSRC"){

                        getTracks(tag, "API_key");
                    }


                })


            });
</script>
export const writeHello = (state) => {
    state.content = "ember";
};

export const setVideo = (state, data) => {
     state.video = {};
     state.video = data;
};

export const setImage = (state, data) => {
     state.image = {};
     state.image = data;
};

export const setMission = (state, data) => {
     state.mission = {};
     state.mission = data;
};
export const setThreeColumnMission = (state) => {
     state.missionImageLeft = [];
     state.missionImageCenter = [];
     state.missionImageRight = [];
     
     for( var i = 0; i + 3 <= state.mission.images.length; i+=3 ){
          state.missionImageLeft.push(state.mission.images[i]);
     }
     for( var j = 1; j + 3 <= state.mission.images.length; j+=3 ){
          state.missionImageCenter.push(state.mission.images[j]);
     }
     for( var k = 2; k + 3 <= state.mission.images.length; k+=3 ){
          state.missionImageRight.push(state.mission.images[k]);
     }

     // state.latestImages
};
export const setTwoColumnMission = (state) => {
     state.twoMissionImageLeft = [];
     state.twoMissionImageLeft = [];

     for( var i = 0; i + 2 <= state.mission.images.length; i += 2){
          state.twoMissionImageLeft.push(state.mission.images[i]);
     }
     for( var j = 1; j + 2 <= state.mission.images.length; j += 2){
          state.twoMissionImageRight.push(state.mission.images[j]);
     }
};

export const setCategory = (state, data) => {
     state.category = [];
     state.category = data;
};
export const setThreeColumnCategory = (state) => {
     state.categoryImageLeft = [];
     state.categoryImageCenter = [];
     state.categoryImageRight = [];
     
     for( var i = 0; i + 3 <= state.category.images.length; i+=3 ){
          state.categoryImageLeft.push(state.category.images[i]);
     }
     for( var j = 1; j + 3 <= state.category.images.length; j+=3 ){
          state.categoryImageCenter.push(state.category.images[j]);
     }
     for( var k = 2; k + 3 <= state.category.images.length; k+=3 ){
          state.categoryImageRight.push(state.category.images[k]);
     }

     // state.latestImages
};
export const setTwoColumnCategory = (state) => {
     state.twoCategoryImageLeft = [];
     state.twoCategoryImageLeft = [];
     
     for( var i = 0; i + 2 <= state.category.images.length; i += 2){
          state.twoCategoryImageLeft.push(state.category.images[i]);
     }
     for( var j = 1; j + 2 <= state.category.images.length; j += 2){
          state.twoCategoryImageRight.push(state.category.images[j]);
     }
};
export const setErrorMessage = (state, data) => {
     state.errorCode = data.code;
     state.errorMessage = data.message;
     console.log('Error MEssage: ', state.errorMessage);
};








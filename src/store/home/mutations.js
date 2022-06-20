// export const writeHello = (state) => {
//     state.content = "ember";
// };

export const lazyLoadController = (state) => {
     state.limiter += 9;
     state.chunks += 9;
};
export const resetLazyLoadController = (state) => {
     state.limiter = 9;
     state.chunks = 0;
}

export const resetAllData = (state) => {
     state.latestImages = [];
     state.popularImages = [];
     state.bestImages = [];
}

export const setMissions = (state, data) => {
    state.missions = data;
};

export const setCategories = (state, data) => {
     state.categories = data;
};

export const setLatestImages = (state, data) => {
     state.latestImages = [...data];
     console.log('Mutation, latest: ', state.latestImages);
};









export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const response = await fetch(`https://vue-http-demo-d471c-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData),
        });

        // const responseData = await response.json();

        if (!response.ok) {
            // error ...
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const response = await fetch(`https://vue-http-demo-d471c-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json();

        if (!response.ok) {
            // error ...
            const error = new Error(response.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];

        for (const key in responseData) {
            const element = responseData[key];
            const coach = {
                id: key,
                firstName: element.firstName,
                lastName: element.lastName,
                description: element.description,
                hourlyRate: element.hourlyRate,
                areas: element.areas
            };

            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
};
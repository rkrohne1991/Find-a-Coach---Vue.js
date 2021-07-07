export default {
    async contactCoach(context, payload) {
        const coachId = payload.coachId;
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://vue-http-demo-d471c-default-rtdb.firebaseio.com/requests/${coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest),
        });

        const responseData = await response.json();

        if (!response.ok) {
            // error ...
            const error = new Error(response.message || 'Failed to send request!');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = coachId;

        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(`https://vue-http-demo-d471c-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`);
        const responseData = await response.json();

        if (!response.ok) {
            // error ...
            const error = new Error(response.message || 'Failed to fetch request!');
            throw error;
        }

        const requests = [];

        for (const key in responseData) {
            const element = responseData[key];
            const request = {
                id: key,
                coachId: coachId,
                userEmail: element.userEmail,
                message: element.message
            };
            requests.push(request);
        }
        context.commit('setRequest', requests);
    }
};
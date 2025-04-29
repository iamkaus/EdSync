/**
 * @method getDistance
 * @desc calculates the distance between school and provided longitude and latitude using haversine formula
 */


export const getDistance = (latitude, longitude, schoolLatitude, schoolLongitude) => {
    try {
        // check to ensure the parameters are of required type

        if (
            typeof latitude !== 'number' || isNaN(latitude) ||
            typeof longitude !== 'number' || isNaN(longitude) ||
            typeof schoolLatitude !== 'number' || isNaN(schoolLatitude) ||
            typeof schoolLongitude !== 'number' || isNaN(schoolLongitude)
        ) {
            return null
        }

        const toRad = (value) => value * Math.PI / 180;

        /**
         * @var radiusOfEarth
         * @desc holds the constant value of radius of earth in km
         */

        const radiusOfEarth = 6371;

        /**
         * @var latitudeDifference
         * @desc holds the difference in school latitude and latitude provided
         */

        const latitudeDifference = toRad(schoolLatitude - latitude);

        /**
         * @var longtitudeDifference
         * @desc holds the longitude difference
         */

        const longitudeDifference = toRad(schoolLongitude - longitude);

        /**
         * @var intermediateValue
         * @desc holds intermediate result value of the haversine calculation
         */

        const intermediateValue =
            Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +                                 // measure change in latitude difference
            Math.cos(toRad(latitude)) * Math.cos(toRad(schoolLatitude)) *                                               // scales the result based on the cosine of the latitude
            Math.sin(longitudeDifference / 2) * Math.sin(longitudeDifference / 2);                                // measure change in longitude difference

        /**
         * @var finalDistance
         * @desc holds the final distance
         */

        const finalDistance = 2 * Math.atan2(Math.sqrt(intermediateValue), Math.sqrt(1 - intermediateValue));

        return radiusOfEarth * finalDistance; // return the final distance
    } catch ( error ) {
        console.error( error );
        throw new Error( error );
    }
}

import { gql } from "apollo-boost";

// BusStationList
export const BUS_STATION_LIST_QUERY = gql`
  query UserBusStationList($latitude: String!, $longitude: String!) {
    UserBusStationList(latitude: $latitude, longitude: $longitude) {
      busStations {
        BUSSTOP_NM
        BUS_NODE_ID
        GPS_LATI
        GPS_LONG
      }
      count
    }
  }
`;

// BusInfo
export const BUS_INFO_QUERY = gql`
  query UserBusInfo($CAR_REG_NO: String!) {
    UserBusInfo(CAR_REG_NO: $CAR_REG_NO) {
      BUS_TYPE
      CAR_REG_NO
    }
  }
`;

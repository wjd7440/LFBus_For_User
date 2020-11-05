import { gql } from "apollo-boost";
//User
export const ACCOUNT_INFO_QUERY = gql`
  query {
    UserInfo {
      id
      maileage
      userId
      needHelp
      equipment
      equipmentName
      createdAt
    }
  }
`;

export const ACCOUNT_EDIT_PASSWORD_CHECKER_QUERY = gql`
  mutation UserAccountPasswordChecker($password: String!) {
    UserAccountPasswordChecker(password: $password)
  }
`;

export const ACCOUNT_EDIT_PASSWORD_QUERY = gql`
  mutation UserAccountEditPassword(
    $password: String!
    $newPassword: String!
  ) {
    UserAccountEditPassword(
      password: $password
      newPassword: $newPassword
    )
  }
`;

export const USER_MAILEAGE_LIST_QUERY = gql`
  query UserMaileageList {
    UserMaileageList(
      orderBy: "createdAt_DESC"
    ) {
      maileages {
        userId
        account
        createdAt
      }
      count
    }
  }
`;

export const USER_MAILEAGE_WRITE_QUERY = gql`
  mutation UserMaileageWrite(
    $maileage: Int!
  ) {
    UserMaileageWrite(
      maileage: $maileage
    )
  }
`;

//Login
export const LOGIN_QUERY = gql`
  mutation UserSignIn($userId: String!, $password: String!) {
    UserSignIn(userId: $userId, password: $password)
  }
`;

export const TOKENUPDATE_QUERY = gql`
  mutation UserTokenUpdate(
    $userId: String!
    $password: String!
    $deviceToken: String!
  ) {
    UserTokenUpdate(
      userId: $userId
      password: $password
      deviceToken: $deviceToken
    )
  }
`;

//Signup
export const USERID_CHECK_QUERY = gql`
  mutation UserIdChecker($userId: String!) {
    UserIdChecker(userId: $userId)
  }
`;

export const SIGNUP_QUERY = gql`
  mutation UserSignUp(
    $userId: String!
    $password: String!
    $sex: String!
    $needHelp: String
    $equipment: String!
    $equipmentName: String!
  ) {
    UserSignUp(
      userId: $userId
      password: $password
      sex: $sex
      needHelp: $needHelp
      equipment: $equipment
      equipmentName: $equipmentName
    )
  }
`;

// BusStationList
export const BUS_STATION_LIST_QUERY = gql`
  query UserBusStationList($latitude: String!, $longitude: String!) {
    UserBusStationList(
      latitude: $latitude
      longitude: $longitude
      orderBy: "DISTANCE_DESC"
    ) {
      busStations {
        BUSSTOP_NM
        BUS_NODE_ID
        GPS_LATI
        GPS_LONG
        DISTANCE
        BUS_STOP_ID
      }
      count
    }
  }
`;

export const BUS_STATION_SEARCH_LIST_QUERY = gql`
  query UserBusStationSearchList {
    UserBusStationSearchList {
      busStations {
        BUS_NODE_ID
        BUSSTOP_NM
      }
      count
    }
  }
`;

export const BUS_START_STATION_DETAIL_QUERY = gql`
  query UserBusStartStationDetail($START_NODE_ID: Int!) {
    UserBusStartStationDetail(START_NODE_ID: $START_NODE_ID) {
      BUSSTOP_NM
    }
  }
`;

export const BUS_TURN_STATION_DETAIL_QUERY = gql`
  query UserBusTurnStationDetail($TURN_NODE_ID: Int!) {
    UserBusTurnStationDetail(TURN_NODE_ID: $TURN_NODE_ID) {
      BUSSTOP_NM
    }
  }
`;

export const BUS_END_STATION_DETAIL_QUERY = gql`
  query UserBusEndStationDetail($END_NODE_ID: Int!) {
    UserBusEndStationDetail(END_NODE_ID: $END_NODE_ID) {
      BUSSTOP_NM
    }
  }
`;
// BusInfo
export const BUS_INFO_QUERY = gql`
  query UserBusInfo($CAR_REG_NO: String!) {
    UserBusInfo(CAR_REG_NO: $CAR_REG_NO) {
      BUS_TYPE
      CAR_REG_NO
      SEAT1
      SEAT2
      deviceToken
    }
  }
`;

// BusRoute
export const BUS_ROUTE_LIST_QUERY = gql`
  query UserBusRouteList($ROUTE_TP: Int,$keyword: String, $skip: Int, $first: Int) {
    UserBusRouteList(
      ROUTE_TP: $ROUTE_TP
      keyword: $keyword
      orderBy: "ROUTE_NO_ASC"
      skip: $skip
      first: $first
    ) {
      busRoutes {
        ALLO_INTERVAL
        ALLO_INTERVAL_SAT
        ALLO_INTERVAL_SUN
        BUSSTOP_CNT
        END_NODE_ID
        END_STOP_ID
        ORIGIN_END
        ORIGIN_END_SAT
        ORIGIN_END_SUN
        ORIGIN_START
        ORIGIN_START_SAT
        ORIGIN_START_SUN
        ROUTE_CD
        ROUTE_NO
        ROUTE_TP
        RUN_DIST_HALF
        RUN_TM
        START_NODE_ID
        START_STOP_ID
        TURN_END
        TURN_END_SAT
        TURN_END_SUN
        TURN_NODE_ID
        TURN_START
        TURN_START_SAT
        TURN_START_SUN
        TURN_STOP_ID
      }
      count
    }
  }
`;

export const BUS_ROUTE_DETAIL_QUERY = gql`
  query UserBusRouteDetail($ROUTE_CD: String!) {
    UserBusRouteDetail(ROUTE_CD: $ROUTE_CD) {
      START_NODE_ID
      START_STOP_ID
      END_NODE_ID
      END_STOP_ID
      ORIGIN_START
      ORIGIN_START_SAT
      ORIGIN_START_SUN
      ORIGIN_END
      ORIGIN_END_SAT
      ORIGIN_END_SUN
      TURN_NODE_ID
      ALLO_INTERVAL
      ALLO_INTERVAL_SAT
      ALLO_INTERVAL_SUN
      ROUTE_TP
    }
  }
`;

// Rotation
export const BUS_ROTATION_LIST_QUERY = gql`
  query UserBusRotationList($ROUTE_CD: String,$keyword: String, $skip: Int, $first: Int) {
    UserBusRotationList(
      ROUTE_CD: $ROUTE_CD
      keyword: $keyword
      orderBy: "BUSSTOP_SEQ_ASC"
      skip: $skip
      first: $first
    ) {
      busRotations {
        BUSSTOP_ENG_NM
        BUSSTOP_NM
        BUSSTOP_SEQ
        BUSSTOP_TP
        BUS_NODE_ID
        BUS_STOP_ID
        GPS_LATI
        GPS_LONG
        ROAD_NM
        ROAD_NM_ADDR
        ROUTE_CD
        TOTAL_DIST
      }
      count
    }
  }
`;

// Reservation
export const RESERVATION_WRITE_QUERY = gql`
  mutation UserReservationWrite(
    $CAR_REG_NO: String!
    $ROUTE_NO: String!
    $BUS_NODE_ID: Int!
    $departureStation: String!
    $arrivalStation: String!
    $equipment: String
    $equipmentName: String
    $pay: Boolean
    $memo: String
    $deviceToken: String
  ) {
    UserReservationWrite(
      CAR_REG_NO: $CAR_REG_NO
      ROUTE_NO: $ROUTE_NO
      BUS_NODE_ID: $BUS_NODE_ID
      departureStation: $departureStation
      arrivalStation: $arrivalStation
      equipment: $equipment
      equipmentName: $equipmentName
      pay: $pay
      memo: $memo
      deviceToken: $deviceToken
    )
  }
`;

export const RESERVATION_LIST_QUERY = gql`
  query UserReservationList($keyword: String, $skip: Int, $first: Int) {
    UserReservationList(
      keyword: $keyword
      orderBy: "id_DESC"
      skip: $skip
      first: $first
    ) {
      reservations {
        id
        CAR_REG_NO
        ROUTE_NO
        BUS_NODE_ID
        departureStation
        arrivalStation
        equipment
        memo
        createdAt
      }
      count
    }
  }
`;

export const RESERVATION_DELETE_QUERY = gql`
  mutation UserReservationDelete($id: String) {
    UserReservationDelete(id: $id)
  }
`;

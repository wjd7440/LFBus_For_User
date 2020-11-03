import React, { useState, useEffect, Component, Fragment } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import SearchableDropdown from "react-native-searchable-dropdown";
import { BUS_STATION_SEARCH_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import style from "../../../constants/style";
import { theme } from "galio-framework";

export default ({ navigation }) => {
    const [busStationNo, setBusStationNo] = useState(null);
    const [busStationName, setBusStationName] = useState(null);
    const [items, setItemsArray] = useState([]);
    const { data, loading, refetch } = useQuery(BUS_STATION_SEARCH_LIST_QUERY, {
        fetchPolicy: "network-only",
    });
    const originItems = !loading && data.UserBusStationSearchList.busStations;

    useEffect(() => {
        if (!loading) {
            let tempItems = [];

            originItems.map((rowData, index) => {
                tempItems.push({
                    id: rowData.BUS_NODE_ID,
                    name: rowData.BUSSTOP_NM,
                });
            });
            setItemsArray(tempItems);
        }
    }, [loading]);

    if (loading) {
        return <Text>Loading......</Text>;
    } else {
        return (
            <Fragment>
                <Header
                    back
                    title={"정류장 검색"}
                    closeNavigate={"HomeScreen"}
                    navigation={navigation}
                />
                <SearchableDropdown
                    multi={true}
                    containerStyle={{ padding: 15 }}
                    onItemSelect={(item) => {
                        setBusStationNo(item.id);
                        setBusStationName(item.name);
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: "#ddd",
                        borderColor: "#bbb",
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: "#222", fontSize: 16 }}
                    itemsContainerStyle={{ maxHeight: 216 }}
                    items={items}
                    defaultIndex={0}
                    chip={true}
                    resetValue={false}
                    textInputProps={{
                        placeholder: "버스정류장을 검색해주세요.",
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 5,
                            backgroundColor: "#fff",
                        },
                    }}
                    listProps={{
                        nestedScrollEnabled: true,
                    }}
                />
                {busStationNo ? (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("BusStationSearchResultScreen", {
                                BUS_NODE_ID: busStationNo,
                                BUSSTOP_NM: busStationName,
                            })
                        }
                    >
                        <Text>검색</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            disabled={true}
                            onPress={() =>
                                navigation.navigate("BusStationSearchResultScreen", {
                                    BUS_NODE_ID: busStationNo,
                                    BUSSTOP_NM: busStationName,
                                })
                            }
                        >
                            <Text>검색</Text>
                        </TouchableOpacity>
                    )}
            </Fragment>
        );
    }
};

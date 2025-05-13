import {
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  Switch,
} from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {WrapperContainer} from '../../components/atoms';
import {CustomTextInput, HeaderComp, SearchBar} from '../../components/molecules';
import actions from '../../redux/actions';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import {lightTheme} from '../../styles/themes';
import fontFamily from '../../constants/fontFamily';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import imagePath from '../../constants/imagePath';
const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? verticalScale(0) : verticalScale(6),
  },
  itemContainer: {
    backgroundColor: lightTheme.colors.white,
    padding: moderateScale(12),
    marginHorizontal: moderateScale(16),
    marginVertical: verticalScale(6),
    borderRadius: 10,
    elevation: 2,
    shadowColor: lightTheme.colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
  },
  itemText: {
    fontSize: scale(14),
    fontFamily: fontFamily.medium,
    color: lightTheme.colors.black,
    flex: 1,
    marginBottom:moderateScale(12)
   
  },
  statusText: {
    width: '25%',
    fontSize: scale(12),
    fontFamily: fontFamily.semiBold,
    color: lightTheme.colors.primary,
    marginLeft: moderateScale(12),
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: verticalScale(30),
    fontSize: scale(16),
    fontFamily: fontFamily.semiBold,
    color: lightTheme.colors.black,
  },
  modalContent: {
    width: '90%',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  dropdownItem: {
    padding: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.opacity50,
  },
  productItem: {
    flexDirection: 'row',
    paddingBottom: verticalScale(20),
    alignItems: 'center',
    backgroundColor: lightTheme.colors.white,
    borderRadius: 8,
    marginVertical: moderateScale(6),
  },
}));

const DashboardScreen = () => {
  const {styles} = useStyles(stylesheet);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [isEndReached, setIsEndReached] = useState(false); 
  const [hasMore, setHasMore] = useState(true);  
  const navigation = useNavigation();

  const getuserList = async (pageNumber = 1) => {
    setIsLoading(true);
    try {
      const data: any = await actions.fetchUserList(pageNumber);
      if (data?.length > 0) {
        const newList = pageNumber === 1 ? data : [...userList, ...data];
        setUserList(newList);
        setFilteredList(filterUsers(newList, searchText)); // Update filtered list
        setPage(pageNumber);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
      setIsEndReached(false);
    }
  };

  useEffect(() => {
    getuserList(page);
  }, []);

  const handleEndReached = () => {
    if (!isEndReached && !isLoading && hasMore) {
      setIsEndReached(true);
      getuserList(page + 1);
    }
  };

  // Filter logic
  const filterUsers = (users: any[], text: string) => {
    return users.filter(user =>
      user?.name?.toLowerCase().includes(text.toLowerCase())
    );
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setFilteredList(filterUsers(userList, text));
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('UserDetails', {item})}>
      <Text numberOfLines={1} style={styles.itemText}>
        Name: {item?.name}
      </Text>
      <Text numberOfLines={1} style={styles.itemText}>
        Phone: {item?.phone}
      </Text>
      <Text numberOfLines={1} style={styles.itemText}>
        Email: {item?.email}
      </Text>
    </TouchableOpacity>
  );

  return (
    <WrapperContainer>
      <HeaderComp rightImage={imagePath.add} centerText="User List" />
      {isLoading && page === 1 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={lightTheme.colors.primary} />
        </View>
      ) : userList.length > 0 ? (
        <>
          <View style={{paddingHorizontal: moderateScale(16)}}>
            <SearchBar
              value={searchText}
              onChangeText={handleSearch}
              placeholder="Search by name"
              icSearch={imagePath.search} // Optional: pass your search icon if needed
            />
          </View>
          <FlatList
            data={filteredList}
            renderItem={renderItem}
            keyExtractor={item => item.id?.toString()}
            contentContainerStyle={{paddingVertical: verticalScale(12)}}
            showsVerticalScrollIndicator={false}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.4}
            ListFooterComponent={
              filteredList.length ===0 ? (
                <Text style={{ textAlign: 'center', color: lightTheme.colors.gray }}>
                  No User Found
                </Text>
              ) : null
            }
            
          />
        </>
      ) : (
        <Text style={styles.noItemsText}>No Users Found</Text>
      )}
    </WrapperContainer>
  );
};


export default DashboardScreen
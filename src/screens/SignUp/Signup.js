import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View,ImageBackground,Text } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login, TYPES } from '@/actions/UserActions';
import { Button, ErrorView, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/Login/Login.styles';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { shadow } from '@/theme';
import { backgroundIcon, settingsIcon } from '@/assets';
import { NAVIGATION } from '@/constants';

export function SignUp({navigation}) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const errors = useSelector((state) => errorsSelector([TYPES.LOGIN], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN], state));

  const handleSubmit = () => {
    dispatch(login(username, password));
  };

  return (
<ImageBackground style = {{width:'100%',height:'100%'}} source={backgroundIcon}>
    <View style={styles.container}>
      <View style={[styles.formContainer, shadow.primary, { backgroundColor: colors.primary }]}>
      <TextField
          autoCapitalize="none"
          accessibilityHint={strings.login.usernameHint}
          accessibilityLabel={strings.login.firstName}
          placeholder={strings.login.firstName}
          value={firstName}
          onChangeText={setFirstname}

        />
        <TextField
          autoCapitalize="none"
          accessibilityHint={strings.login.usernameHint}
          accessibilityLabel={strings.login.lastName}
          placeholder={strings.login.lastName}
          value={lastName}
          onChangeText={setLastName}
        />
         <TextField
          autoCapitalize="none"
          accessibilityHint={strings.login.usernameHint}
          accessibilityLabel={strings.login.username}
          onChangeText={setUsername}
          placeholder={strings.login.username}
          value={username}
        />
      
         <TextField
          secureTextEntry
          autoCapitalize="none"
          placeholder={strings.login.email}
          value={email}
          onChangeText={setEmail}
        />
          <TextField
          secureTextEntry
          accessibilityHint={strings.login.passwordHint}
          accessibilityLabel={strings.login.password}
          autoCapitalize="none"
          onChangeText={setPassword}
          placeholder={strings.login.password}
          textContentType="password"
          value={password}
        />
        <ErrorView errors={errors} />
        <Button
          onPress={handleSubmit}
          style={styles.submitButton}
          title={isLoading ? strings.common.loading : strings.login.signup}
        />
       
      </View>
      <Text style = {styles.donthvAccount}>
          {strings.login.alreadyhvAccount}
       <Text> </Text>
      <Text onPress={()=>navigation.pop()}  style = {styles.signupText}>
          {strings.login.button}
        </Text>
        </Text>
    </View>
    </ImageBackground>
  );
}

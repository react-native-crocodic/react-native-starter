package com.renalpraba.template;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import com.midtrans.sdk.corekit.callback.TransactionFinishedCallback;
import com.midtrans.sdk.corekit.models.snap.TransactionResult;
import com.midtrans.sdk.uikit.SdkUIFlowBuilder;

import java.lang.reflect.InvocationTargetException;

import java.util.List;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
    new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new RNFirebaseMessagingPackage()); 
      packages.add(new RNFirebaseNotificationsPackage());
      packages.add(new MyBridgingTestPackage());

      return packages;
    }

    @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled

      SdkUIFlowBuilder.init()
              .setClientKey("YOUR_CLIENT_KEY") // client_key is mandatory //SB-Mid-client-TW6gzAJ1gYhHNABg Mid-client-Lgqtp0auqBXRn1wp
              .setContext(this) // context is mandatory
              .setTransactionFinishedCallback(new TransactionFinishedCallback() {
                  @Override
                  public void onTransactionFinished(TransactionResult transactionResult) {

                  }
              })
               // set transaction finish callback (sdk callback)
              .setMerchantBaseUrl("YOUR_SERVER_URL") //set merchant url (required)
              .enableLog(true) // enable sdk log (optional)
              /*.setColorTheme(
                      CustomColorTheme(
                              "#FFE51255",
                              "#B61548",
                              "#FFE51255"
                      )
              )*/
              // set theme. it will replace theme on snap theme on MAP ( optional)
              .buildSDK();
  }
    /**
    * Loads Flipper in React Native templates.
    *
    * @param context
    */
    private static void initializeFlipper(Context context) {
      if (BuildConfig.DEBUG) {
        try {
          /*
          We use reflection here to pick up the class that initializes Flipper,
          since Flipper library is not available in release mode
          */
          Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
          aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
        } catch (ClassNotFoundException e) {
          e.printStackTrace();
        } catch (NoSuchMethodException e) {
          e.printStackTrace();
        } catch (IllegalAccessException e) {
          e.printStackTrace();
        } catch (InvocationTargetException e) {
          e.printStackTrace();
        }
      }
  }
}

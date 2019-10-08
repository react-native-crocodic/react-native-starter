package com.renalpraba.template;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.midtrans.sdk.corekit.callback.GetTransactionStatusCallback;
import com.midtrans.sdk.corekit.callback.TransactionCallback;
import com.midtrans.sdk.corekit.core.MidtransSDK;
import com.midtrans.sdk.corekit.models.TransactionResponse;
import com.midtrans.sdk.corekit.models.snap.TransactionStatusResponse;

public class MyBridgingTest extends ReactContextBaseJavaModule implements ActivityEventListener {
    Callback activityCallback;

    public MyBridgingTest(
        ReactApplicationContext reactContext
    ) {
        super(reactContext);

        reactContext.addActivityEventListener(this);
    }

    @ReactMethod
    public void StartGojekAppActivity(
        String token,
        Callback errorCallback,
        Callback successCallback
    ) {
        try {
            activityCallback = successCallback;

            MidtransSDK.getInstance().setAuthenticationToken(token);

            MidtransSDK.getInstance().paymentUsingGoPay(token, new TransactionCallback() {
                @Override
                public void onSuccess(TransactionResponse transactionResponse) {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(transactionResponse.getDeeplinkUrl()));
                    getReactApplicationContext().startActivityForResult(intent, 100, null);
                }

                @Override
                public void onFailure(TransactionResponse transactionResponse, String s) {
                    
                }

                @Override
                public void onError(Throwable throwable) {

                }
            });

        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @Override
    public String getName() {
        return "MyBridgingTest";
    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

        if(requestCode == 100) {

            String token = MidtransSDK.getInstance().readAuthenticationToken();

            MidtransSDK.getInstance().getTransactionStatus(token, new GetTransactionStatusCallback() {
                @Override
                public void onSuccess(TransactionStatusResponse transactionStatusResponse) {
                    activityCallback.invoke("Success");
                }

                @Override
                public void onFailure(TransactionStatusResponse transactionStatusResponse, String s) {
                    activityCallback.invoke("Failure");
                }

                @Override
                public void onError(Throwable throwable) {
                    activityCallback.invoke("Error");
                }
            });
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
//
//  CalendarManager.m
//  react_native_starter
//
//  Created by Crocodic MBP-2 on 25/09/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "MyBridgingTest.h"

#import <React/RCTLog.h>
#import <MidtransKit/MidtransKit.h>
#import "AppDelegate.h"

@implementation MyBridgingTest

RCTResponseSenderBlock myCallback;

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(
                  StartGojekAppActivity:(NSString *)token
                  callback:(RCTResponseSenderBlock)callback
                  ) {
  myCallback = callback;
  
  AppDelegate* appDelegate = (AppDelegate*)[[UIApplication sharedApplication]delegate];
  [[MidtransMerchantClient shared] requestTransacationWithCurrentToken:token completion:^(MidtransTransactionTokenResponse * _Nullable regenerateToken, NSError * _Nullable error) {
    MidtransUIPaymentViewController *paymentVC =
    [[MidtransUIPaymentViewController alloc] initWithToken:regenerateToken
                                         andPaymentFeature:MidtransPaymentFeatureGOPAY];
    
    paymentVC.paymentDelegate = self;
    [appDelegate.window.rootViewController presentViewController:paymentVC animated:YES completion:nil];
  }];
  
  //    dispatch_async(dispatch_get_main_queue(), ^{
  //
  //    });
}

#pragma mark - MidtransUIPaymentViewControllerDelegate

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController paymentFailed:(NSError *)error {
  myCallback(@[[NSNull null], @"Error"]);
}

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController paymentPending:(MidtransTransactionResult *)result {
  //  myCallback(@[[NSNull null], @"Pending"]);
}

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController paymentSuccess:(MidtransTransactionResult *)result {
  myCallback(@[[NSNull null], @"Success"]);
}

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController saveCard:(MidtransMaskedCreditCard *)result {
  
}

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController saveCardFailed:(NSError *)error {
  
}

- (void)paymentViewController_paymentCanceled:(MidtransUIPaymentViewController *)viewController {
  
}

@end

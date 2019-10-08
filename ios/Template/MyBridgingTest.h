//
//  CalendarManager.m
//  react_native_starter
//
//  Created by Crocodic MBP-2 on 25/09/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <MidtransKit/MidtransKit.h>

@interface MyBridgingTest : UIViewController <RCTBridgeModule, MidtransUIPaymentViewControllerDelegate>

@end

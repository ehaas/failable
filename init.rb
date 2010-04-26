require File.dirname(__FILE__) + '/lib/failable'

ActionController::Base.__send__ :include, Failable::ActionControllerExtensions
ActiveRecord::Base.__send__ :include, Failable::ActiveRecordExtensions
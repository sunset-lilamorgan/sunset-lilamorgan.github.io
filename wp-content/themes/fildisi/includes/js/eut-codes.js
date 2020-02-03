(function($){
	'use strict';	 
    $(function(){

        if( $('#eut-head-code-area').length ) {
            var editorSettings = wp.codeEditor.defaultSettings ? _.clone( wp.codeEditor.defaultSettings ) : {};
            editorSettings.codemirror = _.extend(
                {},
                editorSettings.codemirror,
                {
                    indentUnit: 2,
                    tabSize: 2,
                }
            );
            var editor = wp.codeEditor.initialize( $('#eut-head-code-area'), editorSettings );
        }
        if( $('#eut-body-code-area').length ) {
            var editorSettings = wp.codeEditor.defaultSettings ? _.clone( wp.codeEditor.defaultSettings ) : {};
            editorSettings.codemirror = _.extend(
                {},
                editorSettings.codemirror,
                {
                    indentUnit: 2,
                    tabSize: 2
                }
            );
            var editor = wp.codeEditor.initialize( $('#eut-body-code-area'), editorSettings );
        }
        if( $('#eut-footer-code-area').length ) {
            var editorSettings = wp.codeEditor.defaultSettings ? _.clone( wp.codeEditor.defaultSettings ) : {};
            editorSettings.codemirror = _.extend(
                {},
                editorSettings.codemirror,
                {
                  indentUnit: 2,
                  tabSize: 2,
                }
            );
            var editor = wp.codeEditor.initialize( $('#eut-footer-code-area'), editorSettings );
        }
    });
 })(jQuery);
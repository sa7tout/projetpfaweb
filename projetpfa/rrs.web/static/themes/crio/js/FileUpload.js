function loadFileUpload(iconButton, Id, arrayFiles, HideRemoveButton,idUploadComp, size, readonly ,allowedFileExtensions,lang,textButton) {
    //var countFile = 1;
    var fileLists = Array();
    var test = "";
    var initialPreviewConfigLists = Array();

    options = {
            btnBrowse: '<div class="btn btn-primary btn-file btn-sm btn-file"><i class="fa fa-'+iconButton+' icon-'+iconButton+'">  '+textButton+'</i></div>',
            preview: '<div class="file-preview {class}">\n' +
                '    <div class="{dropClass}">\n' +
                '    <div class="file-preview-thumbnails">\n' +
                '    </div>\n' +
                '    <div class="clearfix"></div>' +
                '    <div class="file-preview-status text-center text-success"></div>\n' +
                '    <div class="kv-fileinput-error"></div>\n' +
                '    </div>\n' +
                '</div>',
            footer: '<div class="file-thumbnail-footer">\n' +
                '    <div class="file-caption-name" style="width:{width}">{caption}</div>\n' +
                '    {actions}\n' +
                '</div>',
            actions: '<div class="file-actions">\n' +
                '    <div class="file-footer-buttons">\n' +
                '        {delete}' +
                '    </div>\n' +
                '    <div class="file-upload-indicator" tabindex="-1" title="{indicatorTitle}">{indicator}</div>\n' +
                '    <div class="clearfix"></div>\n' +
                '</div>',
            actionDelete: '<button type="button" class="kv-file-remove fa fa-trash icon-trash {removeClass}" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n'
        };

    if(readonly) {
        options['main1'] = '{preview}';
        J('#' + idUploadComp).hide();
    }
    
    J('#' + idUploadComp).fileinput({
        previewFileType: 'any',
        uploadUrl: "#",
        language: lang,
        uploadExtraData: { id: Id },
        autoReplace: true,
        uploadAsync: false,
        showRemove: false,
        showClose: false,
        maxFileSize: size,
        showUpload: false,
        readOnly: true,
        dropZoneEnabled: false,
        allowedFileExtensions: allowedFileExtensions,
        browseClass: "btn btn-danger btn-file btn-sm",
        initialPreview: fileLists,
        multiple:true, previewFileIconSettings: { // configure your icon file extensions
            'doc': '<i class="fa fa-file-word-o text-primary"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
            'htm': '<i class="fa fa-file-code-o text-info"></i>',
            'txt': '<i class="fa fa-file-text-o text-info"></i>',
            'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
            'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
            // note for these file types below no extension determination logic
            // has been configured (the keys itself will be used as extensions)
            'jpg': '<i class="fa fa-file-photo-o text-danger"></i>',
            'gif': '<i class="fa fa-file-photo-o text-warning"></i>',
            'png': '<i class="fa fa-file-photo-o text-primary"></i>'
        },
        previewFileExtSettings: { // configure the logic for determining icon file extensions
            'doc': function(ext) {
                return ext.match(/(doc|docx)$/i);
            },
            'xls': function(ext) {
                return ext.match(/(xls|xlsx)$/i);
            },
            'ppt': function(ext) {
                return ext.match(/(ppt|pptx)$/i);
            },
            'zip': function(ext) {
                return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
            },
            'htm': function(ext) {
                return ext.match(/(htm|html)$/i);
            },
            'txt': function(ext) {
                return ext.match(/(txt|ini|csv|java|php|js|css)$/i);
            },
            'mov': function(ext) {
                return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
            },
            'mp3': function(ext) {
                return ext.match(/(mp3|wav|amr)$/i);
            }
        },
        initialPreviewConfig: initialPreviewConfigLists, layoutTemplates: options
    }).on("filebatchuploadsuccess", function (event, data, previewId, index) {

        //if (data.files.length == countFile) {

        files = data.response;
        if (files.length > 0) {
            J('#bloc-loader').hide();
        }
        //}
        //countFile++;
    }).on("filepredelete", function (jqXHR) {
        var abort = true;
        if (confirm("Etes-vous sûr de vouloir supprimer cette pièce ?")) {
            abort = false;
        }
        return abort;
    }).on("fileloaded", function (event, file, previewId, index, reader) {
        console.log(file.name);
        //var obje = new 
        //arrayFiles = new array(
        //for (var i = 0; i < arrayFiles.length; i++) {
        //    var fileName = file.name;
        //    var ident = 0;
        //}

    }).on('fileuploaderror', function (event, data, previewId, index) {
      
        var form = data.form, files = data.files, extra = data.extra,
        response = data.response, reader = data.reader;
        console.log('File upload error'); 

    }).on('filepreupload', function (event, data, previewId, index) {
        // do your validation and return an error like below
        //if (customValidationFailed) {
        //    return {
        //        message: 'You are not allowed to do that',
        //        data: { key1: 'Key 1', detail1: 'Detail 1' }
        //    };
        //}
    });


   
    //    .on('filebatchuploadsuccess', function (event, data, previewId, index) {
    //    var form = data.form, files = data.files, extra = data.extra,
    //        response = data.response, reader = data.reader;
    //    console.log('File batch upload success');
    //});
}

function addFileUpload(arrayFiles, idUploadComp) {
    //var countFile = 1;
    var fileLists = Array();
    var test = "";
    var initialPreviewConfigLists = Array();
    if (arrayFiles) {
        for (var i = 0; i < arrayFiles.length; i++) {
            var fileName = arrayFiles[i].nomFichier;
            var ident = arrayFiles[i].id;
            var url = arrayFiles[i].url;
            fileLists.push("<div class='file-preview-text'>" +
            "<h2><i class='glyphicon glyphicon-file'></i></h2><a href='" + url+ "'>" + fileName + "</a></div>");
        }
    }

    J('#' + idUploadComp).fileinput('refresh', { initialPreview: fileLists});
   
}

function setTypeUploadFile(idUploadComp) {
    J(function () {

        J('#'+idUploadComp).fileinput({
            previewFileType: 'any',

        });
    });
}
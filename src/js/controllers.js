(function() {

  angular.module('NotesList', ['appDirectives', 'appServices'])
      .controller('MainNotesController', ['inOutLclStorage', 'images', function(inOutLclStorage, images) {
        self = this;

        self.testowyJSON = inOutLclStorage.openFromLS('notes');

        if(self.testowyJSON.length === 0) {
          self.adding = true;
        }

        self.addNote = function () {
          self.adding = true;
          self.editing = false;
          self.noteTextContent = '';
        };

        self.submitNewNote = function () {
          self.testowyJSON.unshift(
              {
                text: self.noteTextContent,
                img: images.resolveImages(self.noteTextContent)
              }
          );
          inOutLclStorage.saveToLS(self.testowyJSON, 'notes');
          self.showNote(0);
          self.adding = false;
        };

        self.delNote = function() {
          self.editing = false;
          self.adding = false;

          self.testowyJSON.splice(self.actualNoteIndex, 1);
          inOutLclStorage.saveToLS(self.testowyJSON, 'notes');
          if(self.testowyJSON.length === 0) {
            self.adding = true;
            self.noteTextContent = ' ';
            return true;
          }
          if (self.actualNoteIndex === self.testowyJSON.length) {
            self.showNote(self.actualNoteIndex-1);
          } else {
            self.showNote(self.actualNoteIndex);
          }
        };

        self.delNoteFromList = function(index) {

          self.editing = false;
          self.adding = false;

          self.testowyJSON.splice(index, 1);
          inOutLclStorage.saveToLS(self.testowyJSON, 'notes');
          if(self.testowyJSON.length === 0) {
            self.adding = true;
            self.noteTextContent = ' ';
            return true;
          }
        };

        self.editNote = function() {
          self.editing = true;
        };

        self.saveEditedNote = function() {
          self.editing = false;
          self.adding = false;
          self.testowyJSON[self.actualNoteIndex].text = self.noteTextContent;
          self.testowyJSON[self.actualNoteIndex].img = images.resolveImages(self.testowyJSON[self.actualNoteIndex].text);
          self.imgs = self.testowyJSON[self.actualNoteIndex].img;
          inOutLclStorage.saveToLS(self.testowyJSON, 'notes');
        };

        self.showNote = function(index) {
          self.editing = false;
          self.adding = false;
          self.actualNoteIndex = index;

          self.noteTextContent = self.testowyJSON[index].text;
          self.imgs = self.testowyJSON[index].img;
        };

      }]);

})();
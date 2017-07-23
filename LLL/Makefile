SRC = compare.lll compareLoop.lll compareStrings.lll \
	  lenBytes32.lll lenBytes32Loop.lll lenRunes.lll

EVM = $(SRC:.lll=.hex) $(SRC:.lll=_opt.hex)

CC = lllc

%.hex : %.lll strings.lll
	$(CC) $< > $@

%_opt.hex : %.lll strings.lll
	$(CC) -o $< > $@

all: $(EVM)

clean:
	rm -f $(EVM)
